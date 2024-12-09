<?php
include 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $nueva_contrasena = $_POST['nueva_contrasena'];
    $confirmar_contrasena = $_POST['confirmar_contrasena'];

    // Verificar si las contraseñas coinciden
    if ($nueva_contrasena !== $confirmar_contrasena) {
        echo "Las contraseñas no coinciden.";
        exit();
    }

    // Si se ha proporcionado una nueva contraseña, encriptarla
    if (!empty($nueva_contrasena)) {
        $nueva_contrasena = password_hash($nueva_contrasena, PASSWORD_BCRYPT);
        $query = "UPDATE Terapeuta SET nombre = ?, apellido = ?, contrasena = ? WHERE cedula = ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ssss", $nombre, $apellido, $nueva_contrasena, $cedula);
    } else {
        // Si no se ha proporcionado nueva contraseña, solo actualizamos los otros datos
        $query = "UPDATE Terapeuta SET nombre = ?, apellido = ? WHERE cedula = ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("sss", $nombre, $apellido, $cedula);
    }

    if ($stmt->execute()) {
        echo "Datos actualizados correctamente.";
    } else {
        echo "Error al actualizar los datos: " . $conexion->error;
    }

    $stmt->close();
    $conexion->close();
}
?>
