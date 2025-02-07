<?php
include 'auth_check.php';
include 'conexion.php'; // Conexión a la base de datos

// Obtener los datos del terapeuta logueado desde la sesión
$terapeuta_id = $_SESSION['terapeuta_id']; // Cedula del terapeuta logueado
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Paciente</title>
    <link rel="icon" href="../img/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <h2>
        <button class="BytePrensión">
            <span>BytePrensión</span>
        </button>
    </h2>

    <div class="registro-container">
        <h2>Registro de paciente</h2>
                <!-- Mostrar mensaje de error si existe -->
                <?php if (isset($_SESSION['error_message'])): ?>
            <div class="error-message">
                <?php echo $_SESSION['error_message']; ?>
            </div>
            <?php unset($_SESSION['error_message']); // Limpiar el mensaje después de mostrarlo ?>
        <?php endif; ?>
        <form action="guardar_paciente.php" method="POST">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido</label>
                <input type="text" id="apellido" name="apellido" required>
            </div>
            <div class="form-group">
                <label for="edad">Edad</label>
                <input type="text" id="edad" name="edad" min="1" required>
            </div>
            <div class="form-group">
                <label for="diagnostico">Diagnóstico</label>
                <input type="text" id="diagnostico" name="diagnostico" required>
            </div>
            <div class="form-group">
                <label for="id">Cedula Paciente</label>
                <input type="text" id="id" name="id" required>
            </div>
            <div class="form-group">
                <label for="id_terapeuta">Cedula Terapeuta a cargo</label>
                <input type="text" id="id_terapeuta" name="id_terapeuta" value="<?php echo $_SESSION['terapeuta_id']; ?>" readonly>
            </div>
            <div class="botones">
                <button class="regresar" type="submit" class="btn" onclick="window.location.href='configuracion.php'">
                    <span>Guardar</span>
                </button>
                <button class="regresar" type="button" class="btn" onclick="window.location.href='configuracion.php'">
                    <span>Salir</span>
                </button>
            </div>
        </form>
    </div>
</body>

</html>