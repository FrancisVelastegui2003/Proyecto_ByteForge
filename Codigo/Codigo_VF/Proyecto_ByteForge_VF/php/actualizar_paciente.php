<?php
include 'conexion.php';
include 'auth_check.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $edad = $_POST['edad'];
    $diagnostico = $_POST['diagnostico'];

    // Validar que la edad sea mayor que 0
    if ($edad <= 40) {
        echo json_encode(['error' => 'La edad debe ser mayor que 40']);
        exit();
    }

    $query = "UPDATE paciente SET nombre = ?, apellido = ?, edad = ?, diagnostico = ? WHERE cedula = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("ssiss", $nombre, $apellido, $edad, $diagnostico, $cedula);

    if ($stmt->execute()) {
        echo json_encode(['success' => 'Datos actualizados correctamente']);
    } else {
        echo json_encode(['error' => 'Error al actualizar los datos']);
    }

    $stmt->close();
    $conexion->close();
}
?>