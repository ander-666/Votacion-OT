package com.ot.backend.ot_backend.controller;

import org.springframework.web.bind.annotation.*;
import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.domain.Vote;
import com.ot.backend.ot_backend.domain.VoteId;
import com.ot.backend.ot_backend.dto.VoteDto;
import com.ot.backend.ot_backend.dto.VoteResponseDto;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import com.ot.backend.ot_backend.repository.VoteRepository;
import org.springframework.http.ResponseEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/votos")
public class VoteController {

    private final VoteRepository voteRepository;
    private final ParticipantRepository participantRepository;

    public VoteController(VoteRepository voteRepository, ParticipantRepository participantRepository) {
        this.voteRepository = voteRepository;
        this.participantRepository = participantRepository;
    }
    
    @GetMapping
    public List<VoteResponseDto> votingList() {
        return voteRepository.findAllVotes();
    }
    
    
}
