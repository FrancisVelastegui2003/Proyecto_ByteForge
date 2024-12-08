<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean();

include 'conexion.php';

if ($conexion->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conexion->connect_error]);
    exit;
}

// Leer y decodificar el JSON de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Error al decodificar JSON']);
    exit;
}

// Asignar valores con comprobación y valores por defecto
$cedula_paciente = $data['cedula_paciente'] ?? null;
$tiempo = $data['tiempo'] ?? null;
$numero_instrucciones = isset($data['numero_instrucciones']) ? intval($data['numero_instrucciones']) : null;

// Si 'numero_intentos_fallidos' no está presente o es inválido, asigna 0
$numero_intentos_fallidos = isset($data['numero_intentos_fallidos']) && is_numeric($data['numero_intentos_fallidos']) 
    ? intval($data['numero_intentos_fallidos']) 
    : 0;

$fecha = $data['fecha'] ?? null;

// Validar si los campos obligatorios están presentes
if (
    empty($cedula_paciente) ||
    empty($tiempo) ||
    empty($numero_instrucciones) ||
    empty($fecha)
) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    // Preparar la consulta
    $stmt = $conexion->prepare("
        INSERT INTO Juego (tiempo, numero_instrucciones, numero_intentos_fallidos, fecha, cedula_paciente)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param(
        "siiss",
        $tiempo,
        $numero_instrucciones,
        $numero_intentos_fallidos, // Aquí '0' será el valor por defecto si no existe
        $fecha,
        $cedula_paciente
    );

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

$conexion->close();
?>
