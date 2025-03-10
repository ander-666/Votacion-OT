package com.ot.backend.ot_backend.dto;

public class ResultadoVotacionDto {
    private String nombreConcursante;
    private Long totalVotos;

    public ResultadoVotacionDto(String nombreConcursante, Long totalVotos) {
        this.nombreConcursante = nombreConcursante;
        this.totalVotos = totalVotos;
    }
    
    public String getNombreConcursante() {
        return nombreConcursante;
    }

    public void setNombreConcursante(String nombreConcursante) {
        this.nombreConcursante = nombreConcursante;
    }

    public Long getTotalVotos() {
        return totalVotos;
    }

    public void setTotalVotos(Long totalVotos) {
        this.totalVotos = totalVotos;
    }
}
