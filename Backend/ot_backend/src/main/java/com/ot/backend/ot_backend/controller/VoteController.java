package com.ot.backend.ot_backend.controller;

import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/votos")
public class VoteController {


    /*@PostMapping("/{userId}/{concursanteId}")
    public String votar(@PathVariable Long userId, @PathVariable Long concursanteId) {
        Optional<User> usuarioOpt = usuarioRepository.findById(userId);
        Optional<Participant> concursanteOpt = concursanteRepository.findById(concursanteId);

        if (usuarioOpt.isEmpty() || concursanteOpt.isEmpty()) {
            return "Usuario o Concursante no encontrado";
        }

        if (votoRepository.existsByUsuarioIdAndConcursanteId(userId, concursanteId)) {
            return "Ya has votado por este concursante";
        }

        Vote voto = new Vote();
        voto.setUsuario(usuarioOpt.get());
        voto.setConcursante(concursanteOpt.get());
        votoRepository.save(voto);
        return "Voto registrado";
    }*/
}
