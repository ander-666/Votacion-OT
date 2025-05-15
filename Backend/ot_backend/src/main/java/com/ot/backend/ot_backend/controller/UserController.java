package com.ot.backend.ot_backend.controller;

import java.time.Instant;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;
import com.ot.backend.ot_backend.dto.VoteDto;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.repository.VoteRepository;

import org.springframework.web.bind.annotation.RequestBody;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/votar")
public class UserController {

    private final VoteRepository voteRepository;
    private final ParticipantRepository participantRepository;

    public UserController(VoteRepository voteRepository, ParticipantRepository participantRepository) {
        this.voteRepository = voteRepository;
        this.participantRepository = participantRepository;
    }

    @PostMapping
    public ResponseEntity<String> votar(@Valid @RequestBody VoteDto voteDto, HttpServletRequest request,
            @RequestParam(value = "apikey", required = false) String apiKey) {

        // DEBUG: imprimir todas las cabeceras
        System.out.println("==== Cabeceras de la solicitud ====");
        request.getHeaderNames().asIterator()
                .forEachRemaining(headerName -> System.out.println(headerName + ": " + request.getHeader(headerName)));

        // DEBUG: imprimir todos los parámetros
        System.out.println("==== Parámetros de la solicitud ====");
        request.getParameterMap().forEach((key, values) -> System.out.println(key + ": " + String.join(", ", values)));

        // DEBUG: imprimir el contenido del cuerpo (VoteDto)
        System.out.println("==== Cuerpo recibido (VoteDto) ====");
        System.out.println("GalaId: " + voteDto.getGalaId());
        System.out.println("ParticipantId: " + voteDto.getParticipantId());

        if (apiKey == null || apiKey.isEmpty()) {
            apiKey = request.getParameter("apikey");
        }

        String idToken = (apiKey == null || apiKey.isEmpty()) ? request.getHeader("X-Id-Token") : null;

        if ((apiKey == null || apiKey.isEmpty()) && (idToken == null || idToken.isEmpty())) {
            return ResponseEntity.status(401).body("API Key or ID Token is missing");
        }

        String votantId = (apiKey != null && !apiKey.isEmpty()) ? apiKey : idToken;

        Optional<Participant> participantOpt = participantRepository.findById(voteDto.getParticipantId());
        if (participantOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Concursante no encontrado");
        }

        VoteId voteId = new VoteId(voteDto.getGalaId(), votantId);

        if (voteRepository.existsById(voteId)) {
            return ResponseEntity.badRequest().body("Ya has votado en esta gala");
        }

        Vote vote = new Vote();
        vote.setGalaId(voteDto.getGalaId());
        vote.setVotantId(votantId);
        vote.setParticipant(participantOpt.get());
        vote.setVoteDate(Instant.now());

        voteRepository.save(vote);

        return ResponseEntity.ok("Voto registrado exitosamente");
    }

}
