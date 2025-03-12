package com.ot.backend.ot_backend.repository;

import org.springframework.stereotype.Repository;

import com.ot.backend.ot_backend.domain.Gala;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface GalaRepository extends JpaRepository<Gala, Long> {
}
