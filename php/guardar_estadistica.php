<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
ob_clean(); // Limpia la salida previa

include 'conexion.php'; // Incluye la conexión correcta

// Verificar conexión a la base de datos
if ($conexion->connect_error) {
    die(json_encode(['success' => false, 'error' => 'Error de conexión: ' . $conexion->connect_error]));
}

// Leer el cuerpo de la solicitud
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validar si el JSON está bien formado
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(['success' => false, 'error' => 'Error al decodificar JSON', 'mensaje' => json_last_error_msg()]));
}

// Validar datos recibidos
if (
    empty($data['cedula_paciente']) || 
    empty($data['tiempo']) || 
    empty($data['numero_instrucciones']) || 
    empty($data['numero_intentos_fallidos']) || 
    empty($data['fecha'])
) {
    die(json_encode(['success' => false, 'error' => 'Datos incompletos', 'detalles' => $data]));
}

try {
    // Preparar la consulta con la conexión correcta
    $stmt = $conexion->prepare("
        INSERT INTO Juego (tiempo, numero_instrucciones, numero_intentos_fallidos, fecha, cedula_paciente)
        VALUES (?, ?, ?, ?, ?)
    ");

    if (!$stmt) {
        throw new Exception("Error en la preparación de la consulta: " . $conexion->error);
    }

    $stmt->bind_param("siiss", 
        $data['tiempo'], 
        $data['numero_instrucciones'], 
        $data['numero_intentos_fallidos'], 
        $data['fecha'], 
        $data['cedula_paciente']
    );

    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

// Cerrar conexión
$conexion->close();
?>
