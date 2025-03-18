package com.ot.backend.ot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, VoteId> {

    // Encontrar un voto específico por galaId y votantId
    Optional<Vote> findByGalaIdAndVotantId(Long galaId, String votantId);

    // Comprobar si un usuario ya ha votado en una gala específica
    boolean existsByGalaIdAndVotantId(Long galaId, String votantId);

    boolean existsById(VoteId voteId);
}
