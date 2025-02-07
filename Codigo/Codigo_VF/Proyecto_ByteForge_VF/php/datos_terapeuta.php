<?php
include 'auth_check.php'; // Verificar que el terapeuta está logueado
include 'conexion.php'; // Conexión a la base de datos

// Obtener los datos del terapeuta logueado desde la sesión
$terapeuta_id = $_SESSION['terapeuta_id']; // Cedula del terapeuta logueado

// Consultar los datos del terapeuta
$query = "SELECT nombre, apellido, cedula FROM Terapeuta WHERE cedula = ?";
$stmt = $conexion->prepare($query);
$stmt->bind_param("s", $terapeuta_id);
$stmt->execute();
$stmt->bind_result($nombre, $apellido, $cedula);
$stmt->fetch();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar o Eliminar Terapeuta</title>
    <link rel="icon" href="../img/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <div class="header-estadisticas">
        <div>
            <a href="configuracion.php" class="regresar">
                <span>Regresar</span>
            </a>
        </div>
        <div>
            <h1>
                <button class="BytePrensión">
                    <span>Datos del terapeuta</span>
                </button>
            </h1>
        </div>
        <div>

        </div>
    </div>

    <div class="estadistica-container">

        <!-- Información del Terapeuta -->
        <div class="info-paciente">
            <div class="form-group">
                <label class="estilo-opciones">TERAPEUTA LOGUEADO:</label>
                <span id="nombre-terapeuta"><?= $nombre . ' ' . $apellido; ?></span>
            </div>

            <form action="eliminar_terapeuta.php" method="POST"
                onsubmit="return confirm('¿Estás seguro de eliminar tu cuenta?');">
                <!-- Campo oculto con la cédula del terapeuta logueado -->
                <input type="hidden" name="cedula_terapeuta" value="<?php echo $_SESSION['terapeuta_id']; ?>">
                <button type="submit" class="opciones-btn">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front">Eliminar datos del sistema</span>
                </button>
            </form>


        </div>


        <div class="estadisticas-detalle">


            <!-- Datos del Terapeuta-->
            <div class="container-EditarTerapeuta">
                <form id="formEditarTerapeuta">
                    <input type="hidden" name="cedula" value="<?= $cedula ?>">
                    <label class="estilo-opciones">NOMBRE:</label>
                    <input class="estilo-opciones" type="text" name="nombre" value="<?= $nombre ?>">
                    <label class="estilo-opciones">APELLIDO:</label>
                    <input class="estilo-opciones" type="text" name="apellido" value="<?= $apellido ?>"> <br>
                    <label class="estilo-opciones">CÉDULA:</label>
                    <input class="estilo-opciones" type="text" name="cedula" value="<?= $cedula ?>" disabled> <br>

                    <label class="estilo-opciones">NUEVA CONTRASEÑA:</label>
                    <input class="estilo-opciones" type="password" name="nueva_contrasena" required> <br>

                    <label class="estilo-opciones">CONFIRMAR CONTRASEÑA:</label>
                    <input class="estilo-opciones" type="password" name="confirmar_contrasena" required> <br>

                    <button class="opciones-btn" type="button" onclick="actualizarTerapeuta()">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front"> Actualizar Datos </span>
                    </button>

                </form>
            </div>


        </div>
    </div>

    <script src="../scripts/terapeuta.js"></script>
</body>

</html>