package com.ot.backend.ot_backend.domain;

import java.io.Serializable;


public class VoteId implements Serializable {

    private Long galaId;
    private String votantId;

    // Default constructor
    public VoteId() {}

    // Constructor
    public VoteId(Long galaId, String votantId) {
        this.galaId = galaId;
        this.votantId = votantId;
    }

    // Getters and Setters
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

    // Equals and HashCode for composite key
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VoteId voteId = (VoteId) o;

        if (!galaId.equals(voteId.galaId)) return false;
        return votantId.equals(voteId.votantId);
    }

    @Override
    public int hashCode() {
        int result = galaId.hashCode();
        result = 31 * result + votantId.hashCode();
        return result;
    }
}
