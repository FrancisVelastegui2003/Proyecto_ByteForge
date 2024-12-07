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
    <div class="header-estadisticas">
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
        <div>
            <a href="../index.html" class="regresar">
                <span>Salir</span>
            </a>
        </div>
    </div>

    <div class="estadistica-container">

        <!-- Información del Paciente -->
        <div class="info-paciente">
            <h3 class="titulo-datos">Datos del Paciente</h3>
            <div class="form-group">
                <label class="estilo-opciones">Paciente seleccionado:</label>
                <span id="pacienteSeleccionado">No disponible</span>
            </div>
            <div class="form-group">
                <label class="estilo-opciones">Cédula:</label>
                <span id="cedula">No disponible</span>
            </div>
            <div class="form-group">
                <label class="estilo-opciones">Edad:</label>
                <span id="edad">No disponible</span>
            </div>
            <div class="form-group">
                <label class="estilo-opciones">Diagnóstico:</label>
                <span id="diagnostico">No disponible</span>
            </div>
        </div>

        <!-- Sección de Estadísticas -->
        <div class="estadisticas-detalle">
            <h3 class="titulo-datos">Resultados del Juego</h3>
            <div class="form-group">
                <label class="estilo-opciones">Tiempo total:</label>
                <span id="tiempo">0</span>
            </div>
            <div class="form-group">
                <label class="estilo-opciones">Intentos incorrectos:</label>
                <span id="intentos">0</span>
            </div>

            <!-- Botón para guardar las estadísticas -->
            <button class="regresar" id="btnGuardar">Guardar Estadísticas</button>
        </div>
    </div>

    <!-- Scripts -->
    <script src="../scripts/estadistica.js"></script>
</body>

</html>
