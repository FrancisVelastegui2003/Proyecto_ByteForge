<?php
include 'conexion.php';

header('Content-Type: application/json');

if (!isset($_GET['cedula'])) {
    echo json_encode(['error' => 'Cédula no especificada']);
    exit;
}

$cedula = $conexion->real_escape_string($_GET['cedula']);
$query = "SELECT cedula, edad, diagnostico FROM Paciente WHERE cedula = '$cedula'";
$resultado = $conexion->query($query);

if (!$resultado || $resultado->num_rows == 0) {
    echo json_encode(['error' => 'Paciente no encontrado']);
    exit;
}

$datos = $resultado->fetch_assoc();
echo json_encode($datos);

$conexion->close();
?>
