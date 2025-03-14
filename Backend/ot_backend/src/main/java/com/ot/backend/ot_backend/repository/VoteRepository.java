package com.ot.backend.ot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, VoteId> {

    // Encontrar un voto específico por galaId y votantId
    Optional<Vote> findByGalaIdAndVotantId(Long galaId, String votantId);

    // Comprobar si un usuario ya ha votado en una gala específica
    boolean existsByGalaIdAndVotantId(Long galaId, String votantId);

    // Obtener la cantidad de votos para cada concursante en una gala específica
    @Query("SELECT v.participant.id, COUNT(v) FROM Vote v WHERE v.id.galaId = :galaId GROUP BY v.participant.id")
    List<Object[]> countVotosPorConcursante(Long galaId);
}
