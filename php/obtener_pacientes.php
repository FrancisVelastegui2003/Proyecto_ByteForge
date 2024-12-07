<?php
include 'conexion.php';
header('Content-Type: application/json');

// Verificar conexión
if ($conexion->connect_error) {
    echo json_encode(['error' => 'Error en la conexión a la base de datos']);
    exit();
}

// Consulta para obtener todos los datos de los pacientes
$query = "SELECT cedula, nombre, apellido, edad, diagnostico FROM Paciente";
$resultado = $conexion->query($query);

if (!$resultado) {
    echo json_encode(['error' => 'Error en la consulta']);
    $conexion->close();
    exit();
}

// Convertir resultados en un array
$pacientes = array();
while ($fila = $resultado->fetch_assoc()) {
    $pacientes[] = [
        'cedula' => $fila['cedula'],
        'nombre' => $fila['nombre'],
        'apellido' => $fila['apellido'],
        'edad' => $fila['edad'],
        'diagnostico' => $fila['diagnostico']
    ];
}

echo json_encode($pacientes);
$conexion->close();
?>
