package com.ot.backend.ot_backend.service;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    // Constructor-based dependency injection (Best Practice)
    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

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
