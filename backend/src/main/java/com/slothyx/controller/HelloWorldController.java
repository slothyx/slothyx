package com.slothyx.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

    private String message;

    @Autowired
    public HelloWorldController(String message) {
        this.message = message;
    }

    @RequestMapping("/hello")
    String home() {
        return message;
    }
}