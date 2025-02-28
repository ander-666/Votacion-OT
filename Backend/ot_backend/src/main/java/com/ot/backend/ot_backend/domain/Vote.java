package com.ot.backend.ot_backend.domain;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "votos", schema = "common")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "concursante_id", nullable = false)
    private Participant concursante;

    @Column(name = "fecha", updatable = false)
    private LocalDateTime fecha = LocalDateTime.now();
}

