<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estadísticas del Paciente</title>
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
                <label class="estilo-opciones">Nombre:</label>
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
                <label class="estilo-opciones">Tiempo total: <span id="tiempo">0</span></label>
            </div>

            <div class="form-group">
                <label class="estilo-opciones">Intentos incorrectos: <span id="intentos">0</span></label>
            </div>

            <div class="form-group">
                <label class="estilo-opciones">Numero de Instrucciones: <span id="instrucciones">0</span></label>
            </div>

            <div>
                <a href="#" class="regresar">
                    <span id="btnGuardar">Guardar Estadísticas</span>
                </a>
            </div>
        </div>

        <!-- Scripts -->
        <script src="../scripts/estadistica.js"></script>
</body>

</html>