-- Step 1: Create separate databases
CREATE DATABASE votacion;
CREATE DATABASE keycloak_db;

-- Step 2: Connect to `votacion_db` and configure users and permissions
\c votacion;

-- Create roles for applications
CREATE ROLE votacion_user WITH LOGIN PASSWORD 'votacion_secure_password';
CREATE ROLE users_admin WITH LOGIN PASSWORD 'users_admin_secure_password';

-- Create schemas
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS common;

-- Grant permissions for the voting application user
GRANT CONNECT ON DATABASE votacion TO votacion_user;
GRANT USAGE ON SCHEMA common TO votacion_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA common TO votacion_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA common TO votacion_user;

-- Ensure future tables and sequences in the common schema are accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA common GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO votacion_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA common GRANT USAGE, SELECT ON SEQUENCES TO votacion_user;

-- Grant permissions for the users admin
GRANT CONNECT ON DATABASE votacion TO users_admin;
GRANT USAGE ON SCHEMA users TO users_admin;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA users TO users_admin;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA users TO users_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO users_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA users GRANT USAGE, SELECT ON SEQUENCES TO users_admin;

-- Create tables in the 'users' schema
CREATE TABLE IF NOT EXISTS users.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users.roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users.permissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users.user_roles (
    user_id BIGINT REFERENCES users.users(id) ON DELETE CASCADE,
    role_id BIGINT REFERENCES users.roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS users.role_permissions (
    role_id BIGINT REFERENCES users.roles(id) ON DELETE CASCADE,
    permission_id BIGINT REFERENCES users.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Insert initial roles and permissions
INSERT INTO users.roles (name, description) VALUES
('Admin', 'Administrator with full access to all features'),
('User', 'Regular user with limited access'),
('Manager', 'Manager with access to specific features');

INSERT INTO users.permissions (name, description) VALUES
('VIEW_DASHBOARD', 'View the dashboard'),
('EDIT_PROFILE', 'Edit user profile'),
('MANAGE_USERS', 'Manage users and roles'),
('VIEW_REPORTS', 'View reports');

INSERT INTO users.users (username, password, email, active)
VALUES ('admin_user', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin@example.com', TRUE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO users.user_roles (user_id, role_id) VALUES
(1, (SELECT id FROM users.roles WHERE name = 'Admin' LIMIT 1)),
(1, (SELECT id FROM users.roles WHERE name = 'Manager' LIMIT 1));

INSERT INTO users.role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM users.roles r JOIN users.permissions p ON r.name = 'Admin';

-- Create tables in the 'common' schema for the voting application
CREATE TABLE IF NOT EXISTS common.concursantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    edad INT,
    descripcion TEXT,
    foto_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS common.votos (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users.users(id) ON DELETE CASCADE,
    concursante_id BIGINT REFERENCES common.concursantes(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, concursante_id)
);

INSERT INTO common.concursantes (nombre, edad, descripcion, foto_url) VALUES
('María López', 22, 'Cantante de pop con gran carisma en el escenario.', 'https://example.com/maria.jpg'),
('Carlos Pérez', 25, 'Músico de jazz con una voz única.', 'https://example.com/carlos.jpg'),
('Laura Gómez', 20, 'Talentosa bailarina y cantante de flamenco.', 'https://example.com/laura.jpg'),
('Pedro Sánchez', 27, 'Rockero apasionado con gran presencia escénica.', 'https://example.com/pedro.jpg'),
('Ana Torres', 23, 'Especialista en baladas y música romántica.', 'https://example.com/ana.jpg');

--INSERT INTO users.users (username, password, email, active, created_at, updated_at) VALUES ('Samu','samu','samu@samu.samu','yes','2022-03-10 10:20:03','2022-03-10 10:20:03');
--INSERT INTO common.votos (user_id, concursante_id, fecha) VALUES (1, 5,'2022-03-10 10:20:03');

-- Step 3: Connect to `keycloak_db` and configure Keycloak
\c keycloak_db;

-- Create Keycloak database user
CREATE ROLE keycloak_user WITH LOGIN PASSWORD 'keycloak_secure_password';

-- Grant permissions for Keycloak user
GRANT CONNECT ON DATABASE keycloak_db TO keycloak_user;
GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO keycloak_user;  -- Keycloak manages its own tables