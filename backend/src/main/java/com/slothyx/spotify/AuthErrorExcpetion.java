package com.slothyx.spotify;

public class AuthErrorExcpetion extends RuntimeException {
    public AuthErrorExcpetion(String message) {
        super(message);
    }

    public AuthErrorExcpetion(String message, Throwable cause) {
        super(message, cause);
    }
}
