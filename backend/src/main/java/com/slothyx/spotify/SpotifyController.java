package com.slothyx.spotify;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

//TODO CSRF
@RestController
@RequestMapping("/api")
public class SpotifyController {

    @Autowired
    SpotifyService spotifyService;

    @GetMapping("/loginStart")
    RedirectView loginStart() {
        return new RedirectView(spotifyService.getLoginRedirectUrl());
    }

    @GetMapping("/login")
    ModelAndView login(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "error", required = false) String error
    ) {
        if (error != null) {
            throw new RuntimeException("failure logging in: " + error);
        }
        //TODO exception handling
        String oauthResponse = spotifyService.loginCurrentUser(code);
        ModelAndView mav = new ModelAndView();
        mav.setViewName("loginSuccess");
        mav.addObject("oauthResponse", oauthResponse);
        return mav;
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