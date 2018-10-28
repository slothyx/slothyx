package com.slothyx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Configuration {

    public static void main(String[] args) {
        SpringApplication.run(Configuration.class, args);
    }

    @Bean
    String message() {
        return "Hello World!";
    }
}
