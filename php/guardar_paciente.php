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

        // Validar que la edad sea mayor a 40
        if ($edad <= 40) {
            echo <<<HTML
                <script>
                    alert("Error: La edad del paciente debe ser mayor a 40 años.");
                    window.location.href = "../php/registro.php";
                </script>
            HTML;
            exit(); // Detiene la ejecución
        }

        // Validar que la cédula tenga exactamente 10 dígitos numéricos
        if (!preg_match('/^\d{10}$/', $cedula)) {
            echo <<<HTML
                <script>
                    alert("Error: La cédula debe contener exactamente 10 dígitos numéricos.");
                    window.location.href = "../php/registro.php";
                </script>
            HTML;
            exit(); // Detiene la ejecución
        }

        // Verificar si la cédula ya está registrada en la base de datos
        $queryCheck = "SELECT cedula FROM Paciente WHERE cedula = ?";
        $stmtCheck = $conexion->prepare($queryCheck);
        $stmtCheck->bind_param("s", $cedula);
        $stmtCheck->execute();
        $stmtCheck->store_result();

        if ($stmtCheck->num_rows > 0) {
            echo <<<HTML
                <script>
                    alert("Error: Ya existe un paciente registrado con esta cédula.");
                    window.location.href = "../php/registro.php";
                </script>
            HTML;
            exit(); // Detiene la ejecución
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
        echo <<<HTML
            <script>
                alert("Paciente registrado exitosamente.");
                window.location.href = "../php/configuracion.php";
            </script>
        HTML;
        exit(); // Detiene la ejecución después de insertar correctamente
    }
} catch (mysqli_sql_exception $e) {
    // Manejo de errores
    $mensajeError = addslashes($e->getMessage());
    echo <<<HTML
        <script>
            alert("Error al guardar paciente: {$mensajeError}");
            window.location.href = "../php/registro.php";
        </script>
    HTML;
    exit(); // Detiene la ejecución en caso de error
} finally {
    // Cerrar la conexión
    $conexion->close();
}
?>
