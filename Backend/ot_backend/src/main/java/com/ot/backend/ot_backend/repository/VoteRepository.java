package com.ot.backend.ot_backend.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ot.backend.ot_backend.domain.Vote;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    boolean existsByUsuarioIdAndConcursanteId(Long usuarioId, Long concursanteId);
    @Query("SELECT v.concursante.id, COUNT(v) FROM Vote v GROUP BY v.concursante.id")
    List<Object[]> countVotosPorConcursante();
}
