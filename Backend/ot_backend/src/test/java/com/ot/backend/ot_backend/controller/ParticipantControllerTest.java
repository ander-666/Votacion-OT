package com.ot.backend.ot_backend.controller;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.service.ParticipantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

class ParticipantControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ParticipantService participantService;

    @InjectMocks
    private ParticipantController participantController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(participantController).build();
    }

    @Test
    void testObtenerParticipants() throws Exception {
        Participant participant1 = new Participant();
        participant1.setParticipantId(1L);
        participant1.setName("Juan");

        Participant participant2 = new Participant();
        participant2.setParticipantId(2L);
        participant2.setName("Ana");

        when(participantService.obtenerParticipants()).thenReturn(Arrays.asList(participant1, participant2));

        mockMvc.perform(get("/Participants"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].name").value("Juan"))
                .andExpect(jsonPath("$[1].name").value("Ana"));

        verify(participantService, times(1)).obtenerParticipants();
    }

    @Test
    void testObtenerParticipantPorId() throws Exception {
        Participant participant = new Participant();
        participant.setParticipantId(1L);
        participant.setName("Juan");

        when(participantService.obtenerParticipantPorId(1L)).thenReturn(Optional.of(participant));

        mockMvc.perform(get("/Participants/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Juan"));

        verify(participantService, times(1)).obtenerParticipantPorId(1L);
    }

    @Test
    void testCrearParticipant() throws Exception {
        Participant participant = new Participant();
        participant.setParticipantId(1L);
        participant.setName("Juan");

        when(participantService.crearParticipant(any(Participant.class))).thenReturn(participant);

        mockMvc.perform(post("/Participants")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(participant)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Juan"));

        verify(participantService, times(1)).crearParticipant(any(Participant.class));
    }
}
