package com.slothyx.spotify;

import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpotifyConfiguration {

    @Bean(destroyMethod = "close")
    CloseableHttpClient httpClient() {
        return HttpClients.createDefault();
    }

    @Bean
    String oauthClientId() {
        String id = System.getenv("oauth_client_id");
        if (id == null || id.isEmpty()) {
            throw new RuntimeException("need oauth_client_id in env!");
        }
        return id;
    }

    @Bean
    String oauthClientSecret() {
        String secret = System.getenv("oauth_client_secret");
        if (secret == null || secret.isEmpty()) {
            throw new RuntimeException("need oauth_client_secret in env!");
        }
        return secret;
    }
}
