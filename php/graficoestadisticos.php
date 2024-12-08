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
    <div class="configuracion-container">
        <h1>Gráfico de Estadísticas del Paciente</h1>
        <div>
            <label for="select-paciente">Seleccione un paciente:</label>
            <select id="select-paciente">
                <option value="" disabled selected>Seleccione un paciente</option>
            </select>
        </div>
        
        <div>
            <label for="tipo-datos">Mostrar datos:</label>
            <select id="tipo-datos">
                <option value="general">Generales</option>
                <option value="fecha">Por fecha</option>
            </select>
        </div>

        <div>
            <label for="fecha">Fecha específica (opcional):</label>
            <input type="date" id="fecha">
        </div>

        <button id="btn-generar" class="opciones-btn">Generar Gráfico</button>
    </div>

    <div class="canvas-container">
        <canvas id="graficoEstadisticas"></canvas>
    </div>

    <script src="../scripts/grafico_paciente.js"></script>
</body>
</html>
