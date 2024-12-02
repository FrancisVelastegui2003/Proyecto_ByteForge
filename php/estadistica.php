<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas del Paciente</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>

    <div class="estadistica-container">
        <div>
            <a href="configuracion.php" class="regresar">
                <span>Regresar</span>
            </a>
        </div>
        <div>
            <h1>
                <button class="BytePrensión">
                    <span>Estadísticas</span>
                </button>
            </h1>
        </div>

        <!-- Información del Paciente -->
        <div class="info-paciente">
            <div class="form-group">
                <p>Selecciona un paciente: </p>
                <select id="select-paciente" name="select-paciente">
                    <option value="" disabled selected>Seleccione un paciente</option>
                </select>
            </div>
            <div class="datos-paciente" id="datos-paciente">
                <!-- Aquí se cargarán los datos del paciente desde la base de datos -->
                <p>Datos del paciente</p>
            </div>
        </div>

        <!-- Sección de Estadísticas -->
        <div class="estadisticas-detalle">
            <p>Tiempo:</p>
            <p id="tiempo">0</p>
            <p>Intentos:</p>
            <p id="intentos">0</p>
            <div class="grafico-container">
                <!-- Aquí se cargará el gráfico -->
                <canvas id="grafico"></canvas>
            </div>
        </div>
    </div>

    <script src="../scripts/pacientes.js"></script>
</body>

</html>