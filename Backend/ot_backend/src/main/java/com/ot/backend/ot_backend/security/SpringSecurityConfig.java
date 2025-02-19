package com.ot.backend.ot_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new MessageDigestPasswordEncoder("MD5"); // Sabemos que esta deprecado pero necesitamos que se inseguro
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity, can be adjusted if necessary
                .authorizeHttpRequests((authorize) -> {
                    // Public authentication endpoints
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    // Allow OPTIONS requests to any endpoint
                    authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();
                    // Allow unauthenticated access to the login page
                    authorize.requestMatchers("/login").permitAll();
                    // Allow unauthenticated access to static resources (CSS, JS, images, etc.)
                    authorize.requestMatchers("/css/**", "/js/**", "/img/**", "/favicon.ico").permitAll();
                    // Allow unauthenticated access to custom folder (e.g., uploaded images)
                    authorize.requestMatchers("/uploadedImages/**").permitAll();  // Modify this line to match your custom path
                    // All other requests require authentication
                    authorize.anyRequest().authenticated();
                })
                .formLogin(form -> form
                        .loginPage("/login") // Specify the custom login page URL
                        .permitAll() // Allow unauthenticated access to the login page
                );

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

}