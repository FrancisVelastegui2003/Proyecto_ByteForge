<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $conexion->real_escape_string($_POST['nombre']);
    $apellido = $conexion->real_escape_string($_POST['apellido']);
    $edad = (int)$_POST['edad'];
    $diagnostico = $conexion->real_escape_string($_POST['diagnostico']);
    $cedula = $conexion->real_escape_string($_POST['id']);
    $cedula_terapeuta = $conexion->real_escape_string($_POST['id_terapeuta']);

    $query = "INSERT INTO Paciente (cedula, nombre, apellido, edad, diagnostico, cedula_terapeuta) 
              VALUES ('$cedula', '$nombre', '$apellido', $edad, '$diagnostico', '$cedula_terapeuta')";

    if ($conexion->query($query) === TRUE) {
        header("Location: ../php/configuracion.php");
    } else {
        echo "Error al guardar paciente: " . $conexion->error;
    }
}

$conexion->close();
?>
