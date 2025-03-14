package com.ot.backend.ot_backend.service;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {

    @Autowired
    private ParticipantRepository participantRepository;

    public List<Participant> obtenerParticipants() {
        return participantRepository.findAll();
    }

    public Optional<Participant> obtenerParticipantPorId(Long id) {
        return participantRepository.findById(id);
    }

    public Participant crearParticipant(Participant participant) {
        return participantRepository.save(participant);
    }
}
