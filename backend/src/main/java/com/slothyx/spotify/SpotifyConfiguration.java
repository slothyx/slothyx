package com.slothyx.spotify;

import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

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

    //TODO change to host
    @Bean
    String loginRedirectUrl() {
        String secret = System.getenv("login_redirect_url");
        if (secret == null || secret.isEmpty()) {
            throw new RuntimeException("need login_redirect_url in env!");
        }
        return secret;
    }

    @Bean
    ViewResolver loginSuccessViewResolver() {
        return (viewName, locale) -> {
            if ("loginSuccess".equals(viewName)) {
                return new View() {
                    @Override
                    public void render(Map<String, ?> model, HttpServletRequest request, HttpServletResponse response) throws Exception {
                        response.setStatus(200);
                        response.setCharacterEncoding("UTF-8");
                        response.setContentType(ContentType.TEXT_HTML.getMimeType());
                        LoginSuccessPageWriter.write((String) model.get("oauthResponse"), response.getWriter());
                        response.getWriter().close();
                    }

                    @Override
                    public String getContentType() {
                        return ContentType.TEXT_HTML.getMimeType();
                    }
                };
            }
            return null;
        };
    }
}
