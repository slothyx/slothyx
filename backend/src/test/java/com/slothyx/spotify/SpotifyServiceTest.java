package com.slothyx.spotify;


import org.apache.commons.codec.Charsets;
import org.apache.http.Header;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.EntityBuilder;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.message.BasicHttpResponse;
import org.apache.http.message.BasicStatusLine;
import org.apache.http.util.EntityUtils;
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
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.Base64;

import static org.apache.http.HttpVersion.HTTP_1_1;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.testng.Assert.assertEquals;
import static org.testng.Assert.assertTrue;


@Test
public class SpotifyServiceTest {

    private static final String OAUTH_CLIENT_ID = "clientId";
    private static final String OAUTH_CLIENT_SECRET = "clientSecret";
    private static final String LOGIN_REDIRECT_URL = "http://locahost:8080/login";
    private static final String CODE = "oauthCode";
    private static final String ACCESS_TOKEN = "accessCode";
    private static final String REFRESH_TOKEN = "refreshCode";

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
    void testGetLoginRedirectUrl() throws MalformedURLException {
        String urlString = service.getLoginRedirectUrl();
        URL url = new URL(urlString);
        assertEquals(url.getProtocol(), "https");
        assertEquals(url.getHost(), "accounts.spotify.com");
        assertEquals(url.getPath(), "/authorize");
        String query = url.getQuery();
        assertTrue(query.contains("response_type=code"));
        assertTrue(query.contains("redirect_uri=http%3A%2F%2Flocahost%3A8080%2Flogin"));
        assertTrue(query.contains("client_id=" + OAUTH_CLIENT_ID));
        assertTrue(query.contains("scope=streaming+user-modify-playback-state+user-read-birthdate+user-read-email+user-read-private"));
    }

    @Test
    void testLoginFlowWithCodeToken() throws IOException {
        when(httpClient.execute(argThat(createAuthMatcher()))).thenReturn(createSuccessAuthResponse());

        service.loginCurrentUser(CODE);

        verify(session).setAttribute("access_token", ACCESS_TOKEN);
        verify(session).setAttribute("refresh_token", REFRESH_TOKEN);
    }

    private ArgumentMatcher<HttpUriRequest> createAuthMatcher() {
        return request -> {
            assertEquals(request.getMethod(), "POST");
            URI uri = request.getURI();
            assertEquals(uri.getScheme(), "https");
            assertEquals(uri.getHost(), "accounts.spotify.com");
            assertEquals(uri.getPath(), "/api/token");
            try {
                assertTrue(request instanceof HttpEntityEnclosingRequest);
                String body = EntityUtils.toString(((HttpEntityEnclosingRequest) request).getEntity());
                assertTrue(body.contains("grant_type=authorization_code"));
                assertTrue(body.contains("code=" + CODE));
                assertTrue(body.contains("redirect_uri=http%3A%2F%2Flocahost%3A8080%2Flogin"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            Header[] authHeaders = request.getHeaders("Authorization");
            assertEquals(authHeaders.length, 1);
            assertEquals(authHeaders[0].getElements().length, 1);
            assertEquals(authHeaders[0].getValue(),
                    "Basic " + Base64.getEncoder().encodeToString((OAUTH_CLIENT_ID + ":" + OAUTH_CLIENT_SECRET).getBytes(Charsets.UTF_8)));
            return true;
        };
    }

    private HttpResponse createSuccessAuthResponse() {
        BasicHttpResponse response = new BasicHttpResponse(new BasicStatusLine(HTTP_1_1, 200, "OK"));
        response.setEntity(EntityBuilder.create()
                .setText("{\"access_token\":\"" + ACCESS_TOKEN + "\",\"refresh_token\":\"" + REFRESH_TOKEN + "\"}")
                .build());
        return response;
    }
}
