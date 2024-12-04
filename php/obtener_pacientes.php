<?php
include 'conexion.php';
session_start(); // Iniciar sesión para acceder a los datos del terapeuta logueado

header('Content-Type: application/json');

// Verificar si el terapeuta está logueado
if (!isset($_SESSION['terapeuta_id'])) {
    echo json_encode(['error' => 'Acceso no autorizado. Inicie sesión.']);
    exit();
}

// Obtener la cédula del terapeuta logueado desde la sesión
$terapeuta_id = $_SESSION['terapeuta_id'];

// Consultar solo los pacientes asociados al terapeuta logueado (columna `cedula_terapeuta`)
$query = "SELECT cedula, CONCAT(nombre, ' ', apellido) AS nombre_completo, edad, diagnostico 
          FROM Paciente 
          WHERE cedula_terapeuta = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $terapeuta_id);
$stmt->execute();
$resultado = $stmt->get_result();

if (!$resultado) {
    echo json_encode(['error' => 'Error en la consulta']);
    exit();
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
$stmt->close();
$conexion->close();
?>
