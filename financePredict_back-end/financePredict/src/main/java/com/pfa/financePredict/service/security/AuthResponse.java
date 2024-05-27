package com.pfa.financePredict.service.security;

public class AuthResponse {
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    private String token;

    public AuthResponse(String token){
        this.token = token;
    }
}
