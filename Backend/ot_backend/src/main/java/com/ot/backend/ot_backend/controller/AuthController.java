package com.ot.backend.ot_backend.controller;

import java.net.URI;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/loginform")
    public void login(@RequestParam String username, @RequestParam String password/*@RequestBody LoginDto loginDto*/) {
        // Authentication logic
        // JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        // jwtAuthResponse.setAccessToken("token");
        // jwtAuthResponse.setTokenType("Bearer");
        // return jwtAuthResponse;
    }

}
