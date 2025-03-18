package com.ot.backend.ot_backend.controller;

import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.service.ParticipantService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ot.backend.ot_backend.domain.Participant;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/Participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;
    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping
    public List<Participant> obtenerParticipants() {
        return participantService.obtenerParticipants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> obtenerParticipantPorId(@PathVariable Long id) {

        Participant participant = participantRepository.findById(id).orElse(null);

        if (participant == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(participant);
    }

    // New endpoint to check that JWT tokens are sent in the request headers
    @GetMapping("/check-tokens")
    public ResponseEntity<Map<String, String>> checkTokens(HttpServletRequest request) {
        Map<String, String> tokens = new HashMap<>();
        tokens.put("X-Access-Token", request.getHeader("X-Access-Token"));
        tokens.put("X-ID-Token", request.getHeader("X-ID-Token"));
        tokens.put("X-Userinfo", request.getHeader("X-Userinfo"));
        return ResponseEntity.ok(tokens);
    }

    @PostMapping
    public Participant crearParticipant(@RequestBody Participant participant) {
        return participantService.crearParticipant(participant);
    }
}
