package com.slothyx.spotify;

import org.apache.commons.codec.Charsets;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class SpotifyService {

    private static final Logger LOG = LoggerFactory.getLogger(SpotifyService.class);

    @Autowired
    HttpClient client;

    @Autowired
    String oauthClientId;

    @Autowired
    String oauthClientSecret;

    private final AtomicReference<String> accessToken = new AtomicReference<>(null);

    public String searchAlbums(String q) {
        HttpGet get = new HttpGet("https://api.spotify.com/v1/search?" +
                URLEncodedUtils.format(Arrays.asList(
                        new BasicNameValuePair("q", q),
                        new BasicNameValuePair("type", "album")
                ), Charsets.UTF_8));
        return executeToString(get);
    }

    private String executeToString(HttpUriRequest request) {
        checkLogin();
        request.setHeader("Authorization", "Bearer " + accessToken.get());
        try {
            return executeToStringAsIs(request);
        } catch (Exception e) {
            //TODO nicer catch for logout
            accessToken.set(null);
            checkLogin();
            request.setHeader("Authorization", "Bearer " + accessToken.get());
            return executeToStringAsIs(request);
        }
    }

    private String executeToStringAsIs(HttpUriRequest request) {
        try {
            HttpResponse response = client.execute(request);
            byte[] content = EntityUtils.toByteArray(response.getEntity());
            return new String(content, Charsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException("failure executing request", e);
        }
    }


    private synchronized void checkLogin() {
        if (accessToken.get() == null) {
            String newAccessToken;
            try {
                HttpPost post = new HttpPost("https://accounts.spotify.com/api/token");
                post.addHeader("Authorization",
                        "Basic " + Base64.getEncoder().encodeToString((oauthClientId+ ":" + oauthClientSecret).getBytes(Charsets.UTF_8)));
                post.setEntity(new UrlEncodedFormEntity(Collections.singletonList(
                        new BasicNameValuePair("grant_type", "client_credentials")
                )));

                String jsonAccessToken = executeToStringAsIs(post);

                JSONObject accessToken = new JSONObject(jsonAccessToken);
                newAccessToken = accessToken.getString("access_token");
            } catch (IOException e) {
                throw new RuntimeException("failure when sending client credentials login", e);
            }
            accessToken.set(newAccessToken);
        }
    }
}
