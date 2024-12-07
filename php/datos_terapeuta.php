<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar o Eliminar Terapeuta</title>
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
                <span id=""> aqui debe aparecer el nombre del terapeuta :D</span>
            </div>

            <button class="opciones-btn">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Eliminar datos del sistema</span>
            </button>


        </div>


        <div class="estadisticas-detalle">


            <!-- Datos del Terapeuta-->


        </div>

        <script src="../scripts/pacientes.js"></script>
</body>

</html>