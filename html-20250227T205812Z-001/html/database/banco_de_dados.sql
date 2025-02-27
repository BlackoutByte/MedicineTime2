-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS mtwebana;
USE mtwebana;

-- Tabela para usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    nascimento DATE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    sexo ENUM('mulher', 'homem', 'nao-binario') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para logs de ações (opcional, para monitoramento)
CREATE TABLE IF NOT EXISTS logs_acoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    acao VARCHAR(255) NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabela para configurações de conta (pode armazenar configurações adicionais)
CREATE TABLE IF NOT EXISTS configuracoes_conta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    preferencia_notificacao ENUM('sim', 'nao') DEFAULT 'sim',
    idioma VARCHAR(10) DEFAULT 'pt-br',
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

ALTER TABLE usuarios ADD COLUMN codigo_recuperacao INT NULL;

-- Tabela para armazenar cronogramas
CREATE TABLE IF NOT EXISTS cronogramas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_remedio VARCHAR(255) NOT NULL,
    hora_inicial TIME NOT NULL,
    intervalo_horas INT NOT NULL,
    intervalo_dias INT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE cronogramas ADD COLUMN usuario_id INT NOT NULL;

ALTER TABLE cronogramas ADD CONSTRAINT fk_usuario_cronogramas
FOREIGN KEY (usuario_id)
REFERENCES usuarios(id)
ON DELETE CASCADE;

ALTER TABLE cronogramas 
ADD COLUMN foto_base64 TEXT,
ADD COLUMN tipo_aplicacao ENUM('oral', 'injetável', 'pomada') NOT NULL;

