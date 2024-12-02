<?php
include 'conexion.php';

header('Content-Type: application/json');

$query = "SELECT cedula, CONCAT(nombre, ' ', apellido) AS nombre_completo FROM Paciente";
$resultado = $conexion->query($query);

if (!$resultado) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$pacientes = array();
while ($fila = $resultado->fetch_assoc()) {
    $pacientes[] = [
        'id' => $fila['cedula'],
        'nombre' => $fila['nombre_completo']
    ];
}

echo json_encode($pacientes);
$conexion->close();
?>
