package com.ot.backend.ot_backend.controller;

import com.ot.backend.ot_backend.service.ParticipantService;
import com.ot.backend.ot_backend.domain.Participant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping
    public List<Participant> obtenerParticipants() {
        return participantService.obtenerParticipants();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Participant> obtenerParticipantPorId(@PathVariable Long id) {
        return participantService.obtenerParticipantPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Participant crearParticipant(@RequestBody Participant participant) {
        return participantService.crearParticipant(participant);
    }
}
