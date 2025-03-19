package com.ot.backend.ot_backend.domain;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@IdClass(VoteId.class)
@Table(name = "votes", schema = "users")
public class Vote {

    @Id
    private Long galaId;

    @Column(length = 1000, name = "votant_id", nullable = false)
    private String votantId;
    @ManyToOne
    @JoinColumn(name = "participant_id", nullable = false)
    private Participant participant;

    @Column(name = "vote_date", nullable = false)
    private Instant voteDate;

    public Long getGalaId() {
        return galaId;
    }

    public void setGalaId(Long galaId) {
        this.galaId = galaId;
    }


    public String getVotantId() {
        return votantId;
    }

    public void setVotantId(String votantId) {
        this.votantId = votantId;
    }

    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }

    public Instant getVoteDate() {
        return voteDate;
    }

    public void setVoteDate(Instant voteDate) {
        this.voteDate = voteDate;
    }
}
