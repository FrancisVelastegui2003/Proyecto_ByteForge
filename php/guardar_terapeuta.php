<?php
include 'conexion.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $cedula = $_POST['cedula'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $contrasena = $_POST['contrasena'];

        // Encriptar la contraseña antes de guardarla
        $contrasena_encriptada = password_hash($contrasena, PASSWORD_BCRYPT);

        // Habilitar el modo de excepciones en MySQLi
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $query = "INSERT INTO terapeuta (cedula, nombre, apellido, contrasena) 
                  VALUES (?, ?, ?, ?)";

        // Preparar y ejecutar la consulta para evitar inyección SQL
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ssss", $cedula, $nombre, $apellido, $contrasena_encriptada);
        $stmt->execute();

        // Redirigir en caso de éxito
        header("Location: ../index.html");
        exit();
    }
} catch (mysqli_sql_exception $e) {
    // Capturar el error y mostrar alerta
    $mensajeError = addslashes($e->getMessage());
    echo <<<HTML
        <script>
            alert("Error al registrar terapeuta: {$mensajeError}");
            window.location.href = "../php/registroterapeuta.php";
        </script>
    HTML;
} finally {
    // Cerrar conexión
    $conexion->close();
}
?>
