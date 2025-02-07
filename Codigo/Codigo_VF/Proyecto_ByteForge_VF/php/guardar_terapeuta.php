<?php
include 'conexion.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $cedula = $_POST['cedula'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $contrasena = $_POST['contrasena'];

        // Validar que la cédula tenga exactamente 10 dígitos numéricos
        if (!preg_match('/^\d{10}$/', $cedula)) {
            echo <<<HTML
                <script>
                    alert("Error: La cédula debe contener exactamente 10 dígitos numéricos.");
                    window.location.href = "../php/registroterapeuta.php";
                </script>
            HTML;
            exit();
        }

        // Verificar si la cédula ya está registrada
        $queryCheck = "SELECT cedula FROM terapeuta WHERE cedula = ?";
        $stmtCheck = $conexion->prepare($queryCheck);
        $stmtCheck->bind_param("s", $cedula);
        $stmtCheck->execute();
        $stmtCheck->store_result();

        if ($stmtCheck->num_rows > 0) {
            echo <<<HTML
                <script>
                    alert("Error: Ya existe un terapeuta registrado con esta cédula.");
                    window.location.href = "../php/registroterapeuta.php";
                </script>
            HTML;
            exit();
        }

        // Encriptar la contraseña antes de guardarla
        $contrasena_encriptada = password_hash($contrasena, PASSWORD_BCRYPT);

        // Habilitar el modo de excepciones en MySQLi
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        $queryInsert = "INSERT INTO terapeuta (cedula, nombre, apellido, contrasena) VALUES (?, ?, ?, ?)";

        // Preparar y ejecutar la consulta para evitar inyección SQL
        $stmt = $conexion->prepare($queryInsert);
        $stmt->bind_param("ssss", $cedula, $nombre, $apellido, $contrasena_encriptada);
        $stmt->execute();

        // Redirigir en caso de éxito
        echo <<<HTML
            <script>
                alert("Registro exitoso. Serás redirigido al inicio.");
                window.location.href = "../index.html";
            </script>
        HTML;
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
