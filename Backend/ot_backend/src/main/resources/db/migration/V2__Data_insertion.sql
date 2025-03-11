-- Insert data into participants table (Operación Triunfo contestants)
INSERT INTO users.participants (name, surname, description, age, image)
VALUES
    ('Aitana', 'Sánchez-Gijón', 'A talented singer with a powerful voice.', 24, NULL),
    ('Ricky', 'Merino', 'A charming and talented singer with a unique style.', 27, NULL),
    ('Amaia', 'Romero', 'A soulful singer with a distinct voice.', 26, NULL),
    ('Lola', 'Íbarz', 'A contestant known for her emotional ballads.', 23, NULL),
    ('Alfred', 'Garcia', 'A young singer with a passion for music and performing.', 25, NULL);

-- Insert data into gala table (Operación Triunfo Gala events)
INSERT INTO users.gala (description)
VALUES
    ('Operación Triunfo Final Gala - The final showdown between contestants'),
    ('Operación Triunfo Semi-Final Gala - The last chance for contestants to impress'),
    ('Operación Triunfo Battle Gala - A night of performances and tough competition');

-- Insert data into votes table (votes by voters for participants in different galas)
INSERT INTO users.votes (participant_id, gala_id, votant_id, vote_date)
VALUES
    -- Votes for the Final Gala
    (1, 1, 1, '2025-03-08 20:00:00'),  -- Votant 1 votes for Aitana in Final Gala
    (2, 1, 2, '2025-03-08 20:05:00'),  -- Votant 2 votes for Ricky in Final Gala
    (3, 1, 3, '2025-03-08 20:10:00'),  -- Votant 3 votes for Amaia in Final Gala
    -- Votes for the Semi-Final Gala
    (1, 2, 4, '2025-03-08 19:45:00'),  -- Votant 4 votes for Aitana in Semi-Final Gala
    (4, 2, 5, '2025-03-08 19:50:00'),  -- Votant 5 votes for Lola in Semi-Final Gala
    (5, 2, 6, '2025-03-08 19:55:00'),  -- Votant 6 votes for Alfred in Semi-Final Gala
    -- Votes for the Battle Gala
    (2, 3, 7, '2025-03-08 21:00:00'),  -- Votant 7 votes for Ricky in Battle Gala
    (3, 3, 8, '2025-03-08 21:05:00');  -- Votant 8 votes for Amaia in Battle Gala
