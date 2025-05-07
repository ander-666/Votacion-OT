package com.ot.backend.ot_backend.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "gala", schema = "users")
public class Gala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long galaId;

    private String description;

    public Long getGalaId() {
        return galaId;
    }

    public void setGalaId(Long galaId) {
        this.galaId = galaId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
