package com.slothyx.spotify;


import com.slothyx.spotify.util.HttpUriRequestMatcher;
import org.apache.commons.codec.Charsets;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.EntityBuilder;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.message.BasicHttpResponse;
import org.apache.http.message.BasicStatusLine;
import org.mockito.ArgumentMatcher;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Base64;

import static org.apache.http.HttpVersion.HTTP_1_1;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.testng.Assert.assertEquals;


@Test
public class SpotifyServiceTest {

    private static final String OAUTH_CLIENT_ID = "clientId";
    private static final String OAUTH_CLIENT_SECRET = "clientSecret";
    private static final String LOGIN_REDIRECT_URL = "http://locahost:8080/login";
    private static final String CODE = "oauthCode";
    private static final String ACCESS_TOKEN = "accessCode";
    private static final String REFRESH_TOKEN = "refreshCode";
    private static final String REFRESHED_ACCESS_TOKEN = "refreshedAccessCode";
    private static final String SPOTIFY_SONG_URI = "spotify:song:uri";
    private static final String DEVICE_ID = "deviceId";
    private static final String SEARCH_REQUEST = "coolSongSearch";
    private static final String SEARCH_REQUEST_RESPONSE = "cool Song response!";

    @Mock
    HttpClient httpClient;

    @Mock
    HttpServletRequest request;

    @Mock
    HttpServletResponse response;

    @Mock
    HttpSession session;

    SpotifyService service;

    @BeforeMethod
    void setup() {
        MockitoAnnotations.initMocks(this);
        service = new SpotifyService();
        service.client = httpClient;
        service.oauthClientId = OAUTH_CLIENT_ID;
        service.oauthClientSecret = OAUTH_CLIENT_SECRET;
        service.loginRedirectUrl = LOGIN_REDIRECT_URL;

        when(request.getSession()).thenReturn(session);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request, response));
    }

    @Test
    void testGetLoginRedirectUrl() throws URISyntaxException {
        String urlString = service.getLoginRedirectUrl();
        new HttpUriRequestMatcher(new URI(urlString))
                .scheme("https")
                .host("accounts.spotify.com")
                .path("/authorize")
                .queryContains("response_type=code")
                .queryContains("redirect_uri=" + LOGIN_REDIRECT_URL)
                .queryContains("client_id=" + OAUTH_CLIENT_ID)
                .queryContains("scope=streaming+user-modify-playback-state+user-read-birthdate+user-read-email+user-read-private");
    }

    @Test(expectedExceptions = RestException.class)
    void testLoginFlowWithCodeTokenError() throws IOException {
        when(httpClient.execute(argThat(createAuthMatcher()))).thenReturn(createNotAuthResponse());

        service.loginCurrentUser(CODE);
    }

    @Test
    void testLoginFlowWithCodeTokenSuccess() throws IOException {
        when(httpClient.execute(argThat(createAuthMatcher()))).thenReturn(createSuccessAuthResponse());

        service.loginCurrentUser(CODE);

        verify(session).setAttribute("access_token", ACCESS_TOKEN);
        verify(session).setAttribute("refresh_token", REFRESH_TOKEN);
    }

    @Test
    void testRefreshLoginSuccess() throws IOException {
        when(session.getAttribute("refresh_token")).thenReturn(REFRESH_TOKEN);
        when(httpClient.execute(argThat(createRefreshMatcher()))).thenReturn(createSuccessRefreshResponse());

        service.refreshLogin();

        verify(session).setAttribute("access_token", REFRESHED_ACCESS_TOKEN);
    }

    @Test(expectedExceptions = RestException.class)
    void testRefreshLoginError() throws IOException {
        when(session.getAttribute("refresh_token")).thenReturn(REFRESH_TOKEN);
        when(httpClient.execute(argThat(createRefreshMatcher()))).thenReturn(createNotAuthResponse());

        service.refreshLogin();
    }

    @Test
    void playSong() throws IOException {
        when(session.getAttribute("access_token")).thenReturn(ACCESS_TOKEN);
        when(httpClient.execute(argThat(createPlaySongMatcher()))).thenReturn(createEmptySuccessResponse());

        service.playSong(SPOTIFY_SONG_URI, DEVICE_ID);

        verify(httpClient).execute(argThat(createPlaySongMatcher()));
    }

    @Test
    void testSearchTracks() throws IOException {
        when(session.getAttribute("access_token")).thenReturn(ACCESS_TOKEN);
        when(httpClient.execute(argThat(createFirstSearchTracksMatcher()))).thenReturn(createSuccessSearchTrackResponse());

        String result = service.searchTracks(SEARCH_REQUEST);
        assertEquals(result, SEARCH_REQUEST_RESPONSE);

        verify(httpClient).execute(argThat(createFirstSearchTracksMatcher()));
    }

    @Test
    void testSearchTrackWithRetry() throws IOException {
        when(session.getAttribute("refresh_token")).thenReturn(REFRESH_TOKEN);
        when(session.getAttribute("access_token")).thenReturn(ACCESS_TOKEN).thenReturn(REFRESHED_ACCESS_TOKEN);
        doReturn(createNotAuthResponse()).when(httpClient).execute(argThat(createFirstSearchTracksMatcher()));
        doReturn(createSuccessSearchTrackResponse()).when(httpClient).execute(argThat(createSecondSearchTracksMatcher()));
        doReturn(createSuccessRefreshResponse()).when(httpClient).execute(argThat(createSafeRefreshMatcher()));

        String result = service.searchTracks(SEARCH_REQUEST);
        assertEquals(result, SEARCH_REQUEST_RESPONSE);

        verify(session).setAttribute("access_token", REFRESHED_ACCESS_TOKEN);
    }

    private HttpResponse createSuccessSearchTrackResponse() {
        BasicHttpResponse response = new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 200, "OK"));
        response.setEntity(EntityBuilder.create()
                .setText(SEARCH_REQUEST_RESPONSE)
                .build());
        return response;
    }

    private ArgumentMatcher<HttpUriRequest> createFirstSearchTracksMatcher() {
        return request -> {
            try {
                new HttpUriRequestMatcher(request)
                        .method("GET")
                        .scheme("https")
                        .host("api.spotify.com")
                        .path("/v1/search")
                        .queryContains("q=" + SEARCH_REQUEST)
                        .containsHeader("Authorization", getUserAuthheaderValue());
                return true;
            } catch (AssertionError e) {
                return false;
            }
        };
    }

    private ArgumentMatcher<HttpUriRequest> createSecondSearchTracksMatcher() {
        return request -> {
            try {
                new HttpUriRequestMatcher(request)
                        .method("GET")
                        .scheme("https")
                        .host("api.spotify.com")
                        .path("/v1/search")
                        .queryContains("q=" + SEARCH_REQUEST)
                        .containsHeader("Authorization", getRefreshedUserAuthheaderValue());
                return true;
            } catch (AssertionError e) {
                return false;
            }
        };
    }

    private ArgumentMatcher<HttpUriRequest> createPlaySongMatcher() {
        return request -> {
            new HttpUriRequestMatcher(request)
                    .method("PUT")
                    .scheme("https")
                    .host("api.spotify.com")
                    .path("/v1/me/player/play")
                    .queryContains("device_id=" + DEVICE_ID)
                    .bodyContains("\"uris\":[\"" + SPOTIFY_SONG_URI + "\"]")
                    .containsHeader("Authorization", getUserAuthheaderValue());
            return true;
        };
    }

    private String getUserAuthheaderValue() {
        return "Bearer " + ACCESS_TOKEN;
    }

    private String getRefreshedUserAuthheaderValue() {
        return "Bearer " + REFRESHED_ACCESS_TOKEN;
    }

    private HttpResponse createEmptySuccessResponse() {
        return new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 200, "OK"));
    }

    private HttpResponse createSuccessRefreshResponse() {
        BasicHttpResponse response = new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 200, "OK"));
        response.setEntity(EntityBuilder.create()
                .setText("{\"access_token\":\"" + REFRESHED_ACCESS_TOKEN + "\"}")
                .build());
        return response;
    }

    private ArgumentMatcher<HttpUriRequest> createSafeRefreshMatcher() {
        return request -> {
            try {
                createRefreshMatcher().matches(request);
                return true;
            } catch (AssertionError e) {
                return false;
            }
        };
    }

    private ArgumentMatcher<HttpUriRequest> createRefreshMatcher() {
        return request -> {
            new HttpUriRequestMatcher(request)
                    .method("POST")
                    .scheme("https")
                    .host("accounts.spotify.com")
                    .path("/api/token")
                    .bodyContains("grant_type=refresh_token")
                    .bodyContains("refresh_token=" + REFRESH_TOKEN)
                    .containsHeader("Authorization", getClientIdAuthHeaderValue());
            return true;
        };
    }

    private ArgumentMatcher<HttpUriRequest> createAuthMatcher() {
        return request -> {
            new HttpUriRequestMatcher(request)
                    .method("POST")
                    .scheme("https")
                    .host("accounts.spotify.com")
                    .path("/api/token")
                    .bodyContains("grant_type=authorization_code")
                    .bodyContains("code=" + CODE)
                    .bodyContains("redirect_uri=http%3A%2F%2Flocahost%3A8080%2Flogin")
                    .containsHeader("Authorization", getClientIdAuthHeaderValue());
            return true;
        };
    }

    private String getClientIdAuthHeaderValue() {
        return "Basic " + Base64.getEncoder().encodeToString((OAUTH_CLIENT_ID + ":" + OAUTH_CLIENT_SECRET).getBytes(Charsets.UTF_8));
    }

    private HttpResponse createSuccessAuthResponse() {
        BasicHttpResponse response = new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 200, "OK"));
        response.setEntity(EntityBuilder.create()
                .setText("{\"access_token\":\"" + ACCESS_TOKEN + "\",\"refresh_token\":\"" + REFRESH_TOKEN + "\"}")
                .build());
        return response;
    }

    private HttpResponse createNotAuthResponse() {
        return new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 401, "NOT AUTH"));
    }
}
