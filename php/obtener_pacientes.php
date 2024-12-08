<?php
include 'conexion.php'; // Archivo de conexión a la base de datos
session_start(); // Iniciar sesión para acceder a los datos del terapeuta logueado

header('Content-Type: application/json'); // Asegura que la salida sea JSON
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean(); // Limpia cualquier salida anterior

// Verificar conexión a la base de datos
if ($conexion->connect_error) {
    echo json_encode(['error' => 'Error en la conexión a la base de datos: ' . $conexion->connect_error]);
    exit();
}

// Verificar si el terapeuta está logueado
if (!isset($_SESSION['terapeuta_id'])) {
    echo json_encode(['error' => 'Acceso no autorizado. Inicie sesión.']);
    exit();
}

// Obtener la cédula del terapeuta logueado desde la sesión
$terapeuta_id = $_SESSION['terapeuta_id'];

// Consulta para obtener todos los datos de los pacientes
$query = "SELECT cedula, nombre, apellido, edad, diagnostico FROM Paciente WHERE cedula_terapeuta = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $terapeuta_id);
$stmt->execute();
$resultado = $stmt->get_result();
//$resultado = $conexion->query($query);

// Verificar si la consulta tuvo éxito
if (!$resultado) {
    echo json_encode(['error' => 'Error en la consulta: ' . $conexion->error]);
    $conexion->close();
    exit();
}

// Verificar si hay resultados
if ($resultado->num_rows === 0) {
    echo json_encode(['error' => 'No se encontraron pacientes en la base de datos']);
    $conexion->close();
    exit();
}

// Convertir los resultados en un array asociativo
$pacientes = [];
while ($fila = $resultado->fetch_assoc()) {
    $pacientes[] = [
        'cedula' => $fila['cedula'],
        'nombre' => $fila['nombre'],
        'apellido' => $fila['apellido'],
        'edad' => $fila['edad'],
        'diagnostico' => $fila['diagnostico']
    ];
}

// Devolver resultados en formato JSON
echo json_encode($pacientes, JSON_PRETTY_PRINT);

// Cerrar conexión
$conexion->close();
?>