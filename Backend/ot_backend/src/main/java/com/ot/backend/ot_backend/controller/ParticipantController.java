package com.ot.backend.ot_backend.controller;


import com.ot.backend.ot_backend.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Participant crearParticipant(@RequestBody Participant participant) {
        return participantRepository.save(participant);
    }
}
