package com.slothyx.controller;

import com.slothyx.spotify.SpotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    @Autowired
    SpotifyService spotifyService;

    @GetMapping("/hello")
    String home(@RequestParam String q) {
        return spotifyService.searchAlbums(q);
    }
}