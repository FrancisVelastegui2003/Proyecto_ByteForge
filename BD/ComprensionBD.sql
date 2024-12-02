-- Crear la base de datos
CREATE DATABASE ComprensionDB;
USE ComprensionDB;

-- Crear la tabla terapeuta
CREATE TABLE Terapeuta (
    cedula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Crear la tabla paciente
CREATE TABLE Paciente (
    cedula VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INT NOT NULL,
    diagnostico TEXT NOT NULL,
    cedula_terapeuta VARCHAR(10),
    FOREIGN KEY (cedula_terapeuta) REFERENCES Terapeuta(cedula)
);

-- Crear la tabla juego
CREATE TABLE Juego (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tiempo TIME NOT NULL,
    numero_instrucciones INT NOT NULL,
    numero_intentos_fallidos INT NOT NULL,
    fecha DATE NOT NULL,
    cedula_paciente VARCHAR(10),
    FOREIGN KEY (cedula_paciente) REFERENCES Paciente(cedula)
);
