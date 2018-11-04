package com.slothyx.spotify;

import org.apache.commons.codec.Charsets;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Arrays;
import java.util.Base64;

@Service
public class SpotifyService {

    private static final Logger LOG = LoggerFactory.getLogger(SpotifyService.class);

    @Autowired
    HttpClient client;

    @Autowired
    String oauthClientId;

    @Autowired
    String oauthClientSecret;

    @Autowired
    String loginRedirectUrl;

    public String searchTracks(String q) {
        HttpGet get = new HttpGet("https://api.spotify.com/v1/search?" +
                URLEncodedUtils.format(Arrays.asList(
                        new BasicNameValuePair("q", q),
                        new BasicNameValuePair("type", "track")
                ), Charsets.UTF_8));
        return executeToString(get);
    }

    private String executeToString(HttpUriRequest request) {
        request.setHeader("Authorization", "Bearer " + getSession().getAttribute("access_token"));
        try {
            return executeToStringAsIs(request);
        } catch (RestException e) {
            LOG.error("error in execute first try", e);
            //TODO nicer catch for logout
            refreshLogin();
            request.setHeader("Authorization", "Bearer " + getSession().getAttribute("access_token"));
            return executeToStringAsIs(request);
        }
    }

    private String executeToStringAsIs(HttpUriRequest request) {
        try {
            HttpResponse response = client.execute(request);
            if (response.getStatusLine().getStatusCode() != 200) {
                throw new RestException("request " + request.getURI().toString() + " did return not ok code: " + response.getStatusLine().getStatusCode());
            }
            if (response.getEntity() == null) {
                return null;
            }
            byte[] content = EntityUtils.toByteArray(response.getEntity());
            return new String(content, Charsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("failure executing request", e);
        }
    }

    public String getLoginRedirectUrl() {
        return "https://accounts.spotify.com/authorize?" +
                URLEncodedUtils.format(Arrays.asList(
                        new BasicNameValuePair("response_type", "code"),
                        new BasicNameValuePair("redirect_uri", loginRedirectUrl),
                        new BasicNameValuePair("client_id", oauthClientId),
                        new BasicNameValuePair("scope", "streaming user-modify-playback-state user-read-birthdate user-read-email user-read-private") //TODO check if all really needed
                        //TODO new BasicNameValuePair("state", ""),
                ), Charsets.UTF_8);
    }

    public String loginCurrentUser(String code) {
        if (code == null) {
            throw new IllegalArgumentException("code is not allowed to be null");
        }
        HttpPost post = new HttpPost("https://accounts.spotify.com/api/token");
        post.addHeader("Authorization",
                "Basic " + Base64.getEncoder().encodeToString((oauthClientId + ":" + oauthClientSecret).getBytes(Charsets.UTF_8)));
        try {
            post.setEntity(new UrlEncodedFormEntity(Arrays.asList(
                    new BasicNameValuePair("grant_type", "authorization_code"),
                    new BasicNameValuePair("code", code),
                    new BasicNameValuePair("redirect_uri", loginRedirectUrl)
            )));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("error encoding url parameters", e);
        }

        String responseString = executeToStringAsIs(post);
        //TODO better valdiation of return code and things
        if (responseString == null) {
            throw new RestException("could not validate oauth token");
        }
        return responseString;
    }

    void refreshLogin() {
        HttpPost post = new HttpPost("https://accounts.spotify.com/api/token");
        post.addHeader("Authorization",
                "Basic " + Base64.getEncoder().encodeToString((oauthClientId + ":" + oauthClientSecret).getBytes(Charsets.UTF_8)));
        try {
            post.setEntity(new UrlEncodedFormEntity(Arrays.asList(
                    new BasicNameValuePair("grant_type", "refresh_token"),
                    new BasicNameValuePair("refresh_token", String.valueOf(getSession().getAttribute("refresh_token")))
            )));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("error encoding url parameters", e);
        }

        String responseString = executeToStringAsIs(post);
        //TODO better valdiation of return code and things
        if (responseString == null) {
            throw new RestException("could not validate oauth token");
        }
        JSONObject response = new JSONObject(responseString);
        HttpSession session = getSession();
        session.setAttribute("access_token", response.getString("access_token"));
    }

    private HttpSession getSession() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        return attr.getRequest().getSession();
    }

    public String getAccessToken() {
        //TODO no refresh right now
        return String.valueOf(getSession().getAttribute("access_token"));
    }

    public void playSong(String uri, String deviceId) {
        //TODO change deviceId handling
        HttpPut put = new HttpPut("https://api.spotify.com/v1/me/player/play?" +
                URLEncodedUtils.format(Arrays.asList(
                        new BasicNameValuePair("device_id", deviceId)
                ), Charsets.UTF_8));
        JSONArray uris = new JSONArray();
        uris.put(uri);
        JSONObject body = new JSONObject();
        body.put("uris", uris);
        put.setEntity(new StringEntity(body.toString(), ContentType.APPLICATION_JSON));
        executeToString(put);
    }
}
