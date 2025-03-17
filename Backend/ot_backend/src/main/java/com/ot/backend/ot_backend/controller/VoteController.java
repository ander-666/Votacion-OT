package com.ot.backend.ot_backend.controller;

import com.ot.backend.ot_backend.dto.ResultadoVotacionDto;
import com.ot.backend.ot_backend.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/votos")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/{galaId}/{concursanteId}")
    public String votar(@PathVariable Long galaId, 
                        @PathVariable Long concursanteId, 
                        @RequestHeader("ID_Token") String votantId) {
        return voteService.votar(galaId, votantId, concursanteId);
    }

    @GetMapping("/resultados/{galaId}")
    public ResponseEntity<List<ResultadoVotacionDto>> obtenerResultadosVotacion(@PathVariable Long galaId) {
        List<ResultadoVotacionDto> resultados = voteService.obtenerResultadosVotacion(galaId);
        return ResponseEntity.ok(resultados);
    }
}

