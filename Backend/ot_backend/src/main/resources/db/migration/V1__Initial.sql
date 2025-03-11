-- Create users schema if it doesn't already exist
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS common;

-- Create participants table
CREATE TABLE IF NOT EXISTS users.participants (
    participant_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    description TEXT,
    age INT CHECK (age >= 0), 
    image BYTEA
);

-- Create gala table to store Gala events
CREATE TABLE IF NOT EXISTS users.gala (
    gala_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

-- Create votes table (1 vote per user per gala)
CREATE TABLE IF NOT EXISTS users.votes (
    gala_id INT NOT NULL,
    votant_id VARCHAR(255) NOT NULL,  -- User identifier from identity provider
    participant_id INT NOT NULL,  -- The participant the user voted for
    vote_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    PRIMARY KEY (gala_id, votant_id),  -- Enforces 1 vote per user per gala
    CONSTRAINT fk_participant FOREIGN KEY (participant_id) REFERENCES users.participants(participant_id) ON DELETE CASCADE,
    CONSTRAINT fk_gala FOREIGN KEY (gala_id) REFERENCES users.gala(gala_id) ON DELETE CASCADE
);

-- Index for faster lookups by user and gala
CREATE INDEX IF NOT EXISTS idx_votes_gala_votant ON users.votes (gala_id, votant_id);

-- Change ownership of the tables to votacion_user
ALTER TABLE users.participants OWNER TO votacion_user;
ALTER TABLE users.gala OWNER TO votacion_user;
ALTER TABLE users.votes OWNER TO votacion_user;

-- If you want to ensure all future tables are also owned by votacion_user
ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT ALL ON TABLES TO votacion_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT ALL ON SEQUENCES TO votacion_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT ALL ON FUNCTIONS TO votacion_user;
