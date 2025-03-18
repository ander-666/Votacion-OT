package com.ot.backend.ot_backend.dto;

import java.time.Instant;

public class VoteResponseDto {
    private Long galaId;
    private Long participantId;
    private Instant voteDate;

    public VoteResponseDto(Long galaId, Long participantId, Instant voteDate) {
        this.galaId = galaId;
        this.participantId = participantId;
        this.voteDate = voteDate;
    }

    // Getters and setters
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

    public Instant getVoteDate() {
        return voteDate;
    }

    public void setVoteDate(Instant voteDate) {
        this.voteDate = voteDate;
    }
}
