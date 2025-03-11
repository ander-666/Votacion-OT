package com.ot.backend.ot_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ot.backend.ot_backend.domain.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
