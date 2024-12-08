<?php
include 'conexion.php';
session_start();

// Verificar que la solicitud provenga del formulario
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['cedula_terapeuta'])) {
        $cedula_terapeuta = $_POST['cedula_terapeuta'];

        // 1. Eliminar registros en la tabla `juego` que están relacionados con los pacientes del terapeuta
        $queryEliminarJuegos = "DELETE FROM juego WHERE cedula_paciente IN (SELECT cedula FROM paciente WHERE cedula_terapeuta = ?)";
        $stmtEliminarJuegos = $conexion->prepare($queryEliminarJuegos);
        $stmtEliminarJuegos->bind_param("s", $cedula_terapeuta);
        
        if ($stmtEliminarJuegos->execute()) {
            // 2. Eliminar pacientes asociados al terapeuta
            $queryEliminarPacientes = "DELETE FROM paciente WHERE cedula_terapeuta = ?";
            $stmtEliminarPacientes = $conexion->prepare($queryEliminarPacientes);
            $stmtEliminarPacientes->bind_param("s", $cedula_terapeuta);
            
            if ($stmtEliminarPacientes->execute()) {
                // 3. Luego de eliminar los pacientes, eliminar el terapeuta
                $queryEliminarTerapeuta = "DELETE FROM terapeuta WHERE cedula = ?";
                $stmtEliminarTerapeuta = $conexion->prepare($queryEliminarTerapeuta);
                $stmtEliminarTerapeuta->bind_param("s", $cedula_terapeuta);
                
                if ($stmtEliminarTerapeuta->execute()) {
                    // Redirigir al index si la eliminación fue exitosa
                    session_destroy(); // Cerrar la sesión del terapeuta
                    header("Location: ../index.html");
                    exit();
                } else {
                    echo "Error al eliminar el terapeuta: " . $conexion->error;
                }
            } else {
                echo "Error al eliminar los pacientes: " . $conexion->error;
            }

            $stmtEliminarPacientes->close();
        } else {
            echo "Error al eliminar los registros de juego: " . $conexion->error;
        }

        $stmtEliminarJuegos->close();
        $conexion->close();
    } else {
        echo "Error: No se proporcionó la cédula del terapeuta.";
    }
} else {
    echo "Acceso no permitido.";
}
?>
