package com.slothyx.spotify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class SpotifyController {

    @Autowired
    SpotifyService spotifyService;

    @GetMapping("/loginStart")
    RedirectView loginStart() {
        return new RedirectView(spotifyService.getLoginRedirectUrl());
    }

    @GetMapping("/login")
    RedirectView login(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "error", required = false) String error
    ) {
        if (error != null) {
            throw new RuntimeException("failure logging in: " + error);
        }
        return new RedirectView(spotifyService.loginCurrentUser(code));
    }

    @GetMapping(value = "/search", produces = "application/json")
    String search(@RequestParam("q") String q) {
        return spotifyService.searchTracks(q);
    }

    @GetMapping("/getAccessToken")
    String getAccessToken() {
        return spotifyService.getAccessToken();
    }

    //TODO post/put
    @GetMapping("/playSong")
    void playSong(
            @RequestParam("uri") String uri,
            @RequestParam("deviceid") String deviceId
    ) {
        spotifyService.playSong(uri, deviceId);
    }
}