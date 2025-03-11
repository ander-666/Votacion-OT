package com.ot.backend.ot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;

import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, VoteId> {

    // Find a vote by galaId and votantId
    Optional<Vote> findByGalaIdAndVotantId(Long galaId, String votantId);

    // Check if a user has already voted for a particular gala
    boolean existsByGalaIdAndVotantId(Long galaId, String votantId);
}
