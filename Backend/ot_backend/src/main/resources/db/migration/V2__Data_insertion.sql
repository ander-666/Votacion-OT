-- Insert data into participants table (Operación Triunfo contestants)
INSERT INTO users.participants (participant_id, name, surname, description, image)
VALUES
    (1, 'Naiara', 'Moreno Aznar', 'Nació en Zaragoza el 29 de abril de 1997 y es la mayor de 6 hermanos. Fue cantante de la orquesta aragonesa Nueva Alaska hasta su paso por Operación Triunfo 2023.', NULL),
    (2, 'Pablo (Paul Thin)', 'Suárez Delgado', 'Armilla, Granada, 14 de diciembre de 2002', NULL),
    (3, 'Ruslana', 'Panchyshyna Lapets', 'Tenerife, 10 de septiembre de 2005', NULL),
    (4, 'Juanjo', 'Bona Arregui', 'Nació en Magallón, Zaragoza, el 10 de noviembre de 2003. Tiene un hermano 3 años menor que él. Recibió clases de canto, solfeo y jota desde muy pequeño, al mismo tiempo que aprendía a tocar el clarinete en la Escuela de Música de Magall', NULL),
    (5, 'Lucas', 'Curotto', 'Desde muy temprana edad Curotto fue diagnosticado con TDAH y dislexia,1 lo que dificultó su desempeño académico. Debido a estas dificultades, decidió dejar la escuela en su adolescencia para enfocarse en su pasión por la música.', NULL),
    (6, 'Martin', 'Urrutia Horas', 'Nació en Guecho el 30 de marzo de 20051 y es el mayor de tres hermanos.2 Martin mostró interés por las artes escénicas desde muy pequeño, lo que le llevó a estudiar danza en la Escuela de Ballet Roser Carrés. Tras cursar el bachillerato de artes escénicas en Bilbao, ingresó en Dantzerti, la Escuela Superior de Arte Dramático y Danza del País Vasco.', NULL),
    (7, 'Bea', 'Fernández Soto', ' Nació en 2004 en San Fernando de Henares y es la menor de dos hermanas. Desde muy pequeña recibió clases de música y movimiento. Antes de entrar a Operación Triunfo 2023, estudiaba el grado de Magisterio en Educación Primaria en la Universidad Complutense de Madrid y daba clases de iniciación de música y piano a niños.', NULL),
    (8, 'Chiara', 'Oliver Williams', 'De ascendencia menorquina por parte de padre y británica por parte de madre, mostró interés por la música desde sus primeros años. Su primer contacto con un escenario fue a los seis años, cuando participó como candidata en un concurso de talento organizado por un hotel.', NULL),
    (9, 'Álvaro', 'Gutiérrez Mayo', 'Sevilla, 4 de marzo de 2002', NULL),
    (10, 'Cristian (Cris)', 'Bartolomé Botau', '(San Cristóbal de La Laguna, Tenerife, 20 de septiembre de 1999', NULL),
    (11, 'Violeta', 'Hódar Feixas', 'Motril, Granada, 23 de enero de 2001', NULL),
    (12, 'Alex', 'Márquez Angorilla', 'Córdoba, 24 de noviembre de 1998', NULL),
    (13, 'Salma', 'Díaz Picón', 'Mijas, Málaga, 4 de octubre de 2002', NULL),
    (14, 'Almudena (Denna)', 'Ruiz Vilchez', 'Ogíjares, Granada, 30 de marzo de 2001', NULL),
    (15, 'Omar', 'Samba Castro', 'Yunquera de Henares, Guadalajara, 9 de mayo de 1997', NULL),
    (16, 'Suzete', 'Correia Ramos', 'Santa Cruz de Tenerife, 21 de abril de 2001', NULL);


-- Insert data into gala table (Operación Triunfo Gala events)
INSERT INTO users.gala (gala_id, description)
VALUES
    (1,'Operación Triunfo Final Gala - The final showdown between contestants'),
    (2,'Operación Triunfo Semi-Final Gala - The last chance for contestants to impress'),
    (3,'Operación Triunfo Battle Gala - A night of performances and tough competition');

-- Insert data into votes table (votes by voters for participants in different galas)
INSERT INTO users.votes (participant_id, gala_id, votant_id, vote_date)
VALUES
    -- Votes for the Final Gala
    (1, 1, '1ddjfawerfaouwehrfouawheofuhawoehfawouer', '2025-03-08 20:00:00'),  -- Votant 1 votes for Aitana in Final Gala
    (2, 1, 'fafakwrfvgawkefvweufvawkeufvatwkefvawkef', '2025-03-08 20:05:00'),  -- Votant 2 votes for Ricky in Final Gala
    (3, 1, 'vcbrvukysdlcysgdclygcecwkvecvwekcvgsdcvs', '2025-03-08 20:10:00'),  -- Votant 3 votes for Amaia in Final Gala
    -- Votes for the Semi-Final Gala
    (1, 2, 'rvfterkdgcvaycekcuawvekctavwekucvawkueuk', '2025-03-08 19:45:00'),  -- Votant 4 votes for Aitana in Semi-Final Gala
    (4, 2, 'wdkawecvawkeucvwikeutcvkawetcvwkeudjhcgh', '2025-03-08 19:50:00'),  -- Votant 5 votes for Lola in Semi-Final Gala
    (5, 2, 'kvwekutcvwkuectvkghjxvczbxcvwecukwevkuwy', '2025-03-08 19:55:00'),  -- Votant 6 votes for Alfred in Semi-Final Gala
    -- Votes for the Battle Gala
    (2, 3, 'uerybqkercqwkeucybcsuasvgcxkuyasdcauweyc', '2025-03-08 21:00:00'),  -- Votant 7 votes for Ricky in Battle Gala
    (3, 3, 'kqwfbfikywkeucvwekuctvwekutcvwkuetcvkugd', '2025-03-08 21:05:00');  -- Votant 8 votes for Amaia in Battle Gala
