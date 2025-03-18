package com.ot.backend.ot_backend.controller;

import org.springframework.web.bind.annotation.*;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;
import com.ot.backend.ot_backend.dto.VoteDto;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.repository.VoteRepository;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("/votos")
public class VoteController {

    private final VoteRepository voteRepository;
    private final ParticipantRepository participantRepository;

    public VoteController(VoteRepository voteRepository, ParticipantRepository participantRepository) {
        this.voteRepository = voteRepository;
        this.participantRepository = participantRepository;
    }

    @PostMapping
    public ResponseEntity<String> votar(@Valid @RequestBody VoteDto voteDto, HttpServletRequest request) {
        // Extract Keycloak ID token from request (opaque token expected)
        String idToken = request.getHeader("X-Id-Token");
        if (idToken == null || idToken.isEmpty()) {
            return ResponseEntity.status(401).body("ID Token is missing");
        }

        // Use the token directly as the votantId without decoding it.
        String votantId = idToken; // opaque token used as identifier

        // Check if the participant exists
        Optional<Participant> participantOpt = participantRepository.findById(voteDto.getParticipantId());
        if (participantOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Concursante no encontrado");
        }

        // Create a VoteId to check if the user already voted
        VoteId voteId = new VoteId(voteDto.getGalaId(), votantId);

        if (voteRepository.existsById(voteId)) {
            return ResponseEntity.badRequest().body("Ya has votado en esta gala");
        }

        // Save the vote
        Vote vote = new Vote();
        vote.setGalaId(voteDto.getGalaId());
        vote.setVotantId(votantId);
        vote.setParticipant(participantOpt.get());
        vote.setVoteDate(Instant.now());

        voteRepository.save(vote);

        return ResponseEntity.ok("Voto registrado exitosamente");
    }
}
