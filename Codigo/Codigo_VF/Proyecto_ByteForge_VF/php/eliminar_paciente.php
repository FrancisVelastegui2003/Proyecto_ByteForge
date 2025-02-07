<?php
include 'conexion.php';
include 'auth_check.php';

header('Content-Type: application/json'); // Asegura que la salida sea JSON

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'];

    // Iniciar una transacción
    $conexion->begin_transaction();

    try {
        // Eliminar el registro de la tabla juego
        $queryJuego = "DELETE FROM juego WHERE cedula_paciente = ?";
        $stmtJuego = $conexion->prepare($queryJuego);
        $stmtJuego->bind_param("s", $cedula);
        $stmtJuego->execute();

        // Eliminar el registro de la tabla paciente
        $queryPaciente = "DELETE FROM paciente WHERE cedula = ?";
        $stmtPaciente = $conexion->prepare($queryPaciente);
        $stmtPaciente->bind_param("s", $cedula);
        $stmtPaciente->execute();

        // Confirmar la transacción
        $conexion->commit();

        echo json_encode(['success' => 'Paciente y sus juegos eliminados correctamente']);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        $conexion->rollback();
        echo json_encode(['error' => 'Error al eliminar el paciente y sus juegos: ' . $e->getMessage()]);
    }

    $stmtJuego->close();
    $stmtPaciente->close();
    $conexion->close();
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>