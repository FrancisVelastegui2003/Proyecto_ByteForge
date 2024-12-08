<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gráfico de Estadísticas del Paciente</title>
    <link rel="stylesheet" href="../css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- Librería Chart.js -->
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
                    <span>Gráfico de Estadísticas del Paciente</span>
                </button>
            </h1>
        </div>
        <div>
            <a href="../index.html" class="regresar">
                <span>Salir</span>
            </a>
        </div>
    </div>



    <div class="opciones-estadisticas-container">
        <div>
            <div>
                <label class="letras-importantes" for="select-paciente">Seleccione un paciente:</label>
                <select class="estilo-select" id="select-paciente" >
                    <option value="" disabled selected>Seleccione un paciente</option>
                </select>
            </div>
            <div>
                <label class="letras-importantes" for="tipo-datos">Mostrar datos:</label>
                <select class="estilo-select" id="tipo-datos">
                    <option value="general">Generales</option>
                    <option value="fecha">Por fecha</option>
                </select>
            </div>
            <div>
                <label class="letras-importantes" for="fecha">Fecha específica (opcional):</label>
                <input class="estilo-select" type="date" id="fecha">
            </div>
        </div>
        <div>
            <button id="btn-generar" class="opciones-btn">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Generar Gráfico </span>
            </button>
        </div>
    </div>




    <div class="canvas-container">
        <canvas id="graficoEstadisticas"></canvas>
    </div>

    <script src="../scripts/grafico_paciente.js"></script>
</body>

</html>