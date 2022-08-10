-- habilida o uso da função uuid_generate_v4() para gerar uma hash de id unico
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- habilita o uso da extensão para criação de criptografia de senhas
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- cria a tabela de usuários
CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

-- insert inicial para criação de um usuario admin
INSERT INTO application_user(username, password) VALUES ('admin', crypt('admin', 'chva81425078'));