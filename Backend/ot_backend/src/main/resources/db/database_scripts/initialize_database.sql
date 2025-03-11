-- Step 1: Create separate databases
SELECT 'CREATE DATABASE votacion_db' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'votacion_db')\gexec

SELECT 'CREATE DATABASE keycloak_db' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'keycloak_db')\gexec

SELECT 'CREATE DATABASE kong_db' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kong_db')\gexec

-- Step 2: Configure 'votacion_db'
\c votacion_db;

-- Create roles for applications
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'votacion_user') THEN
        CREATE ROLE votacion_user WITH LOGIN PASSWORD 'votacion_secure_password';
    END IF;
END $$;

-- Create schemas if they do not exist and set ownership
CREATE SCHEMA IF NOT EXISTS users AUTHORIZATION votacion_user;
CREATE SCHEMA IF NOT EXISTS common AUTHORIZATION votacion_user;

-- Grant full access to votacion_user
GRANT CONNECT ON DATABASE votacion_db TO votacion_user;
GRANT USAGE, CREATE ON SCHEMA users, common TO votacion_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA users, common TO votacion_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA users, common TO votacion_user;

-- Ensure future tables and sequences are owned by votacion_user
ALTER DEFAULT PRIVILEGES IN SCHEMA users, common GRANT ALL ON TABLES TO votacion_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA users, common GRANT ALL ON SEQUENCES TO votacion_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA users, common GRANT ALL ON FUNCTIONS TO votacion_user;

-- Step 3: Configure Keycloak database
\c keycloak_db;

-- Create Keycloak database user
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'keycloak_user') THEN
        CREATE ROLE keycloak_user WITH LOGIN PASSWORD 'keycloak_secure_password';
    END IF;
END $$;

-- Grant permissions for Keycloak user
GRANT CONNECT ON DATABASE keycloak_db TO keycloak_user;
GRANT ALL PRIVILEGES ON DATABASE keycloak_db TO keycloak_user;

-- Grant necessary permissions to the public schema for keycloak_user
GRANT USAGE, CREATE ON SCHEMA public TO keycloak_user;

-- Grant full privileges on existing tables in public schema
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO keycloak_user;

-- Grant full privileges on existing sequences in public schema
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO keycloak_user;

-- Ensure future tables and sequences are accessible to keycloak_user
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO keycloak_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO keycloak_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO keycloak_user;

-- Step 4: Configure Kong database
\c kong_db;

-- Ensure kong_user exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'kong_user') THEN
        CREATE ROLE kong_user WITH LOGIN PASSWORD 'kong_secure_password';
    END IF;
END $$;

-- Grant necessary privileges on the database
GRANT CONNECT ON DATABASE kong_db TO kong_user;
GRANT ALL PRIVILEGES ON DATABASE kong_db TO kong_user;

-- Ensure kong_user owns the public schema
ALTER SCHEMA public OWNER TO kong_user;

-- Grant full access to schema public
GRANT USAGE, CREATE ON SCHEMA public TO kong_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO kong_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO kong_user;

-- Ensure future tables and sequences are accessible
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO kong_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO kong_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO kong_user;
