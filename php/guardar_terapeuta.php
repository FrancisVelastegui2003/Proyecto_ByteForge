<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $contrasena = $_POST['contrasena'];

    // Encriptar la contraseña antes de guardarla
    $contrasena_encriptada = password_hash($contrasena, PASSWORD_BCRYPT);

    $query = "INSERT INTO terapeuta (cedula, nombre, apellido, contrasena) VALUES ('$cedula', '$nombre', '$apellido', '$contrasena_encriptada')";
    if ($conexion->query($query) === TRUE) {
        header("Location: ../index.html");
    } else {
        echo "Error: " . $query . "<br>" . $conexion->error;
    }
}

$conexion->close();
?>
