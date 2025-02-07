<?php
include 'conexion.php';
session_start(); // Iniciar sesión para manejar mensajes de error

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre = $conexion->real_escape_string($_POST['nombre']);
        $apellido = $conexion->real_escape_string($_POST['apellido']);
        $edad = (int)$_POST['edad'];
        $diagnostico = $conexion->real_escape_string($_POST['diagnostico']);
        $cedula = $conexion->real_escape_string($_POST['id']);
        $cedula_terapeuta = $conexion->real_escape_string($_POST['id_terapeuta']);

        // Validar que la edad sea mayor a 40
        if ($edad <= 40) {
            $_SESSION['error_message'] = "Error: La edad del paciente debe ser mayor a 40 años.";
            header("Location: ../php/registro.php");
            exit();
        }

        // Validar que la cédula del paciente tenga exactamente 10 dígitos numéricos
        if (!preg_match('/^\d{10}$/', $cedula)) {
            $_SESSION['error_message'] = "Error: La cédula del paciente debe contener exactamente 10 dígitos numéricos.";
            header("Location: ../php/registro.php");
            exit();
        }

        // Validar que la cédula del terapeuta tenga exactamente 10 dígitos numéricos
        if (!preg_match('/^\d{10}$/', $cedula_terapeuta)) {
            $_SESSION['error_message'] = "Error: La cédula del terapeuta debe contener exactamente 10 dígitos numéricos.";
            header("Location: ../php/registro.php");
            exit();
        }

        // Verificar si la cédula del paciente ya está registrada en la base de datos
        $queryCheck = "SELECT cedula FROM Paciente WHERE cedula = ?";
        $stmtCheck = $conexion->prepare($queryCheck);
        $stmtCheck->bind_param("s", $cedula);
        $stmtCheck->execute();
        $stmtCheck->store_result();

        if ($stmtCheck->num_rows > 0) {
            $_SESSION['error_message'] = "Error: Ya existe un paciente registrado con esta cédula.";
            header("Location: ../php/registro.php");
            exit();
        }

        // Habilitar el modo de excepción en MySQLi
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        // Insertar paciente en la base de datos
        $query = "INSERT INTO Paciente (cedula, nombre, apellido, edad, diagnostico, cedula_terapeuta) 
                  VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ssssss", $cedula, $nombre, $apellido, $edad, $diagnostico, $cedula_terapeuta);
        $stmt->execute();

        // Redirigir en caso de éxito
        $_SESSION['success_message'] = "Paciente registrado exitosamente.";
        header("Location: ../php/configuracion.php");
        exit();
    }
} catch (mysqli_sql_exception $e) {
    // Manejo de errores de base de datos
    $_SESSION['error_message'] = "Error al guardar paciente: " . addslashes($e->getMessage());
    header("Location: ../php/registro.php");
    exit();
} finally {
    // Cerrar la conexión
    $conexion->close();
}
?>
