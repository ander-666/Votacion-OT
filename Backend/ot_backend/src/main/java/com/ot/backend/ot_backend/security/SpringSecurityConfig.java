package com.ot.backend.ot_backend.security;

import java.util.List;

import org.springframework.web.filter.CorsFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableMethodSecurity
public class SpringSecurityConfig {

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for better security
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowCredentials(true);
                    config.setAllowedOriginPatterns(List.of("http://localhost:*", "http://kong",  "http://votacion-frontend*", "http://*.localhost")); // ✅ Permitir el frontend  ,"http://localhost:8002", "http://localhost:5173"
                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
                    config.setExposedHeaders(List.of("Authorization", "Content-Length")); // opcional: exponer headers al cliente
                    return config;
                }))
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity, can be adjusted if necessary
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
                    authorize.requestMatchers("/uploadedImages/**").permitAll(); // Modify this line to match your custom path
                    // Allow unauthenticated access to Swagger endpoints
                    authorize.requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**", "/Participants/**", "/votos/**",
                            "/swagger-resources/**").permitAll();
                    authorize.requestMatchers(HttpMethod.GET, "/Participants/**").permitAll();
                    authorize.requestMatchers(HttpMethod.POST, "/api/vote").authenticated();
                    // All other requests require authentication
                    authorize.anyRequest().authenticated();
                })
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/login") // Login page for OAuth2 (optional, can be configured)
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/logout") // Handle logout via Spring Security
                        .logoutSuccessUrl("/login?logout") // Redirect to login page after logout
                        .permitAll());

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
