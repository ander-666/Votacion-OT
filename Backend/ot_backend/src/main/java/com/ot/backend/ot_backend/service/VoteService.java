package com.ot.backend.ot_backend.service;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.dto.ResultadoVotacionDto;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    public String votar(Long galaId, String votantId, Long concursanteId) {
        /// Comprobar si el concursante existe
        Optional<Participant> participantOpt = participantRepository.findById(concursanteId);

        if (participantOpt.isEmpty()) {
            return "Concursante no encontrado";
        }

        // Comprobar si el usuario ya votó en esta gala
        if (voteRepository.existsByGalaIdAndVotantId(galaId, votantId)) {
            return "Ya has votado en esta gala";
        }

        // Crear y guardar el voto
        Vote voto = new Vote();
        voto.setGalaId(galaId);
        voto.setVotantId(votantId);
        voto.setParticipant(participantOpt.get());
        voto.setVoteDate(Instant.now());

        voteRepository.save(voto);
        return "Voto registrado con éxito";
    }

    public List<ResultadoVotacionDto> obtenerResultadosVotacion(Long galaId) {
        List<Object[]> resultados = voteRepository.countVotosPorConcursante(galaId);
        List<ResultadoVotacionDto> resultadoVotacionDTOs = new ArrayList<>();

        for (Object[] resultado : resultados) {
            Long participantId = (Long) resultado[0];
            Long votos = (Long) resultado[1];
            Participant participant = participantRepository.findById(participantId).orElse(null);

            if (participant != null) {
                ResultadoVotacionDto dto = new ResultadoVotacionDto(participant.getName(), votos);
                resultadoVotacionDTOs.add(dto);
            }
        }
        return resultadoVotacionDTOs;
    }
}
