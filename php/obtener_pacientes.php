<?php
include 'conexion.php';

header('Content-Type: application/json');

$query = "SELECT cedula, CONCAT(nombre, ' ', apellido) AS nombre_completo, edad, diagnostico FROM Paciente";
$resultado = $conexion->query($query);

if (!$resultado) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit;
}

$pacientes = array();
while ($fila = $resultado->fetch_assoc()) {
    $pacientes[] = [
        'id' => $fila['cedula'],
        'nombre' => $fila['nombre_completo'],
        'edad' => $fila['edad'],
        'diagnostico' => $fila['diagnostico']
    ];
}

echo json_encode($pacientes);
$conexion->close();
?>
