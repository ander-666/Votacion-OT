package com.ot.backend.ot_backend.dto;

import jakarta.validation.constraints.NotNull;

public class VoteDto {

    @NotNull
    private Long galaId;

    @NotNull
    private Long participantId;

    public VoteDto() {}

    public VoteDto(Long galaId, Long participantId) {
        this.galaId = galaId;
        this.participantId = participantId;
    }

    public Long getGalaId() {
        return galaId;
    }

    public void setGalaId(Long galaId) {
        this.galaId = galaId;
    }

    public Long getParticipantId() {
        return participantId;
    }

    public void setParticipantId(Long participantId) {
        this.participantId = participantId;
    }
}
