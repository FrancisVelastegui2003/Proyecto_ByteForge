<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprensión</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <div class="encabezado">
        <div>
            <a href="configuracion.php" class="regresar">
                <span>Regresar</span>
            </a>
        </div>

        <button class="BytePrensión">
            <span>BytePrensión</span>
        </button>
        <div>
            <button class="regresar">
                <span>Pausar</span>
            </button>

            <button class="regresar" onclick="window.location.href='estadistica.php'">
                <span>Finalizar</span>
            </button>
        </div>
    </div>
    <div class="container">
        <div class="menu">
            <h2>Opciones</h2>
            <ul><b>
                    <li onclick="setColor('#FF0000')" class="color-option" style="color: #FF0000;">Rojo</li>
                    <li onclick="setColor('#8B4513')" class="color-option" style="color: #8B4513;">Café</li>
                    <li onclick="setColor('#FFC0CB')" class="color-option" style="color: #FFC0CB;">Rosado</li>
                    <li onclick="setColor('#FFFF00')" class="color-option" style="color: #FFFF00;">Amarillo</li>
                    <li onclick="setColor('#800080')" class="color-option" style="color: #800080;">Morado</li>
                    <li onclick="setColor('#008000')" class="color-option" style="color: #008000;">Verde</li>
                    <li onclick="setColor('#ADD8E6')" class="color-option" style="color: #ADD8E6;">Celeste</li>
                    <li onclick="setColor('#000000')" class="color-option" style="color: #000000;">Negro</li>
                    <li onclick="setColor('clear')" class="color-option" style="color: #000000;">Borrar</li>
                    <li onclick="drawTriangle()">Dibujar Triángulo</li>
                    <li onclick="enableTextInput()" class="color-option" style="color: #000000;">Escribir</li>
            </ul></b>
        </div>
        <div class="canvas-container">
            <canvas id="tablero" width="500" height="250"></canvas>
            <p id="instruction" class="instruction"></p> <!-- Contenedor para la instrucción actual -->
            <p id="notification" style="font-size: 1.5rem; color: green; font-weight: bold;"></p>
            <p id="attemptCounter" class="hidden">Intentos incorrectos: 0</p> <!-- Contador oculto -->
            <p id="timer" class="hidden">0:00</p> <!-- Temporizador oculto -->
        </div>
        <p id="successMessage" style="font-size: 1.2rem; color: green; font-weight: bold; text-align: center;"></p>
    </div>

    <script src="../scripts/tablero.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            drawBoard();
        });

        function enableTextInput() {
            textInputMode = true;
            selectedColor = "";
            drawTriangleMode = false;
        }
    </script>
</body>

</html>