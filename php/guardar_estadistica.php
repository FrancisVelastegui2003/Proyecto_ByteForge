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

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Error al decodificar JSON']);
    exit;
}

if (
    empty($data['cedula_paciente']) ||
    empty($data['tiempo']) ||
    empty($data['numero_instrucciones']) ||
    empty($data['numero_intentos_fallidos']) ||
    empty($data['fecha'])
) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $conexion->prepare("
        INSERT INTO Juego (tiempo, numero_instrucciones, numero_intentos_fallidos, fecha, cedula_paciente)
        VALUES (?, ?, ?, ?, ?)
    ");
    $stmt->bind_param(
        "siiss",
        $data['tiempo'],
        $data['numero_instrucciones'],
        $data['numero_intentos_fallidos'],
        $data['fecha'],
        $data['cedula_paciente']
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
