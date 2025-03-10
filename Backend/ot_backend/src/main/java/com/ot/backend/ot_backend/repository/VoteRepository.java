package com.ot.backend.ot_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ot.backend.ot_backend.domain.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUsuarioIdAndConcursanteId(Long usuarioId, Long concursanteId);
}
