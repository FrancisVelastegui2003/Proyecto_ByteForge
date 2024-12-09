<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'conexion.php';

$input = file_get_contents("php://input");
$data = json_decode($input, true);

$cedula = $data['cedula'] ?? null;
$tipo = $data['tipo'] ?? null;
$fecha = $data['fecha'] ?? null;

if (!$cedula || !$tipo) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    if ($tipo === "fecha" && $fecha) {
        $stmt = $conexion->prepare("
            SELECT fecha, TIME_TO_SEC(tiempo) AS tiempo_total, numero_intentos_fallidos, numero_instrucciones
            FROM Juego 
            WHERE cedula_paciente = ? AND fecha = ?
        ");
        $stmt->bind_param("ss", $cedula, $fecha);
    } else {
        $stmt = $conexion->prepare("
            SELECT fecha, TIME_TO_SEC(tiempo) AS tiempo_total, numero_intentos_fallidos, numero_instrucciones
            FROM Juego 
            WHERE cedula_paciente = ?
        ");
        $stmt->bind_param("s", $cedula);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $estadisticas = [];
    while ($row = $result->fetch_assoc()) {
        $estadisticas[] = $row;
    }

    echo json_encode($estadisticas);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

$conexion->close();
?>
