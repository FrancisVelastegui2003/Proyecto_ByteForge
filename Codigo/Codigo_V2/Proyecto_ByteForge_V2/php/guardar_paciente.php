<?php
include 'conexion.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $nombre = $conexion->real_escape_string($_POST['nombre']);
        $apellido = $conexion->real_escape_string($_POST['apellido']);
        $edad = (int)$_POST['edad'];
        $diagnostico = $conexion->real_escape_string($_POST['diagnostico']);
        $cedula = $conexion->real_escape_string($_POST['id']);
        $cedula_terapeuta = $conexion->real_escape_string($_POST['id_terapeuta']);

        // Habilitar modo de excepción en MySQLi
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        // Consulta SQL
        $query = "INSERT INTO Paciente (cedula, nombre, apellido, edad, diagnostico, cedula_terapeuta) 
                  VALUES ('$cedula', '$nombre', '$apellido', $edad, '$diagnostico', '$cedula_terapeuta')";

        // Ejecutar la consulta
        $conexion->query($query);

        // Redirigir en caso de éxito
        header("Location: ../php/configuracion.php");
        exit();
    }
} catch (mysqli_sql_exception $e) {
    // Mostrar una alerta si ocurre un error y quedarse en la misma página
    $mensajeError = addslashes($e->getMessage());
    echo <<<HTML
        <script>
            alert("Error al guardar paciente: {$mensajeError}");
            window.location.href = "../php/registro.php";
        </script>
    HTML;
} finally {
    // Cerrar la conexión
    $conexion->close();
}
?>
