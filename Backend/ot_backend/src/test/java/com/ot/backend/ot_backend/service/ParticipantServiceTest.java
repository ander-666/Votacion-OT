package com.ot.backend.ot_backend.service;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.repository.ParticipantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ParticipantServiceTest {

    @Mock
    private ParticipantRepository participantRepository;

    @InjectMocks
    private ParticipantService participantService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testObtenerParticipants() {
        Participant participant1 = new Participant();
        participant1.setParticipantId(1L);
        participant1.setName("John");

        Participant participant2 = new Participant();
        participant2.setParticipantId(2L);
        participant2.setName("Jane");

        when(participantRepository.findAll()).thenReturn(Arrays.asList(participant1, participant2));

        List<Participant> participants = participantService.obtenerParticipants();
        
        assertEquals(2, participants.size());
        verify(participantRepository, times(1)).findAll();
    }

    @Test
    void testObtenerParticipantPorId() {
        Participant participant = new Participant();
        participant.setParticipantId(1L);
        participant.setName("John");

        when(participantRepository.findById(1L)).thenReturn(Optional.of(participant));

        Optional<Participant> result = participantService.obtenerParticipantPorId(1L);

        assertTrue(result.isPresent());
        assertEquals("John", result.get().getName());
        verify(participantRepository, times(1)).findById(1L);
    }

    @Test
    void testCrearParticipant() {
        Participant participant = new Participant();
        participant.setName("New Participant");

        when(participantRepository.save(participant)).thenReturn(participant);

        Participant savedParticipant = participantService.crearParticipant(participant);

        assertNotNull(savedParticipant);
        assertEquals("New Participant", savedParticipant.getName());
        verify(participantRepository, times(1)).save(participant);
    }
}
