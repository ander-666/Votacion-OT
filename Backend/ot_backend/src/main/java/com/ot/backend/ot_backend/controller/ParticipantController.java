package com.ot.backend.ot_backend.controller;


import com.ot.backend.ot_backend.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ot.backend.ot_backend.domain.Participant;

import java.util.List;

@RestController
@RequestMapping("/Participants")
public class ParticipantController {

    @Autowired
    private ParticipantRepository participantRepository;

    @GetMapping
    public List<Participant> obtenerParticipants() {
        return participantRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> obtenerParticipantPorId(@PathVariable Long id) {
        Participant participant = participantRepository.findById(id).orElse(null);
        
        if (participant == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(participant);
    }

    @PostMapping
    public Participant crearParticipant(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }
}
