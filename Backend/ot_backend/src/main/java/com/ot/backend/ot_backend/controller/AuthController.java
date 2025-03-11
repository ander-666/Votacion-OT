package com.ot.backend.ot_backend.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ot.backend.ot_backend.domain.Gala;
import com.ot.backend.ot_backend.dto.RegisterDto;
import com.ot.backend.ot_backend.repository.GalaRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;


import java.sql.Timestamp;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private GalaRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/loginform")
    public void login(@RequestParam String username,
            @RequestParam String password/* @RequestBody LoginDto loginDto */) {
        // Authentication logic
        // JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        // jwtAuthResponse.setAccessToken("token");
        // jwtAuthResponse.setTokenType("Bearer");
        // return jwtAuthResponse;
    }

    /*@PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterDto request) {
        Optional<User> existingUser = userRepository.findByUsername(request.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("El usuario ya existe");
        }

        // Obtener el rol USER por defecto
        Gala userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setActive(true);
        user.setRoles(Collections.singleton(userRole));
        user.setCreaterdAt(new Timestamp(System.currentTimeMillis()));
        user.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(user);

        return ResponseEntity.ok("Usuario registrado exitosamente");
    }*/

}
