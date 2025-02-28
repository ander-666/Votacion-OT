package com.ot.backend.ot_backend.controller;

import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.repository.VoteRepository;
import com.ot.backend.ot_backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.domain.User;
import com.ot.backend.ot_backend.domain.Vote;

import java.util.Optional;

@RestController
@RequestMapping("/votos")
public class VoteController {

    @Autowired
    private VoteRepository votoRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private ParticipantRepository concursanteRepository;

    @PostMapping("/{userId}/{concursanteId}")
    public String votar(@PathVariable Long userId, @PathVariable Long concursanteId) {
        Optional<User> usuarioOpt = usuarioRepository.findById(userId);
        Optional<Participant> concursanteOpt = concursanteRepository.findById(concursanteId);

        if (usuarioOpt.isEmpty() || concursanteOpt.isEmpty()) {
            return "Usuario o Concursante no encontrado";
        }

        if (votoRepository.existsByUsuarioIdAndConcursanteId(userId, concursanteId)) {
            return "Ya has votado por este concursante";
        }

        Vote voto = new Vote();
        voto.setUsuario(usuarioOpt.get());
        voto.setConcursante(concursanteOpt.get());
        votoRepository.save(voto);
        return "Voto registrado";
    }   
}
