package com.ot.backend.ot_backend.utils;

import com.ot.backend.ot_backend.domain.Participant;
import com.ot.backend.ot_backend.repository.ParticipantRepository;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;


@Configuration
public class ImageToDatabaseWithRepositories{

    @Autowired
    private ParticipantRepository participantRepository;

    @Autowired
    private ResourceLoader resourceLoader;

    @PostConstruct
    public void insertImages() throws IOException {
        String imageFolderPath = "static/img";

        Resource resource = resourceLoader.getResource("classpath:" + imageFolderPath);
        Path rootPath = Paths.get(resource.getURI());

        try (Stream<Path> paths = Files.walk(rootPath)) {
            paths.filter(Files::isRegularFile).sorted().forEach(filePath -> {
                try {
                    byte[] imageData = Files.readAllBytes(filePath);
                    long id = extractIdFromFileName(filePath.getFileName().toString());
                    if (id != -1) {
                        updateParticipantImage(id, imageData);
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }
    }

    public long extractIdFromFileName(String fileName) {
        try {
            return Long.parseLong(fileName.substring(0, fileName.lastIndexOf('.')));
        } catch (NumberFormatException | StringIndexOutOfBoundsException e) {
            System.err.println("Could not extract ID from file name: " + fileName);
            return -1;
        }
    }

    public void updateParticipantImage(long id, byte[] imageData) {
        Participant participant = participantRepository.findById(id).orElse(null);
        if (participant != null) {
            participant.setImage(imageData); // Set the byte[] directly
            participantRepository.save(participant);
        } else {
            System.err.println("Participant with ID " + id + " not found.");
        }
    }
}