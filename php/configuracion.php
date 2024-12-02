<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuracion del juego</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>

    <div class="configuracion-container">
        <div>
            <a href="../index.html" class="regresar">
                <span>Regresar</span>
            </a>
        </div>
        <div>
            <h1>
                <button class="BytePrensión">
                    <span>Configuración del Juego</span>
                </button>
            </h1>
        </div>

        <!-- Información del Paciente -->
        <div class="opciones-configuracion">

            <button class="opciones-btn" onclick="window.location.href='registro.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Registrar nuevo paciente </span>
            </button>

            <button class="opciones-btn" onclick="window.location.href='estadistica.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Ver Estadísticas </span>
            </button>

            <div class="form-group">
                <p>Selecciona un paciente: </p>
                <select id="select-paciente" name="select-paciente">
                    <option value="" disabled selected>Seleccione un paciente</option>
                </select>
            </div>
        </div>

        <div class="configuracion-reglas">
            <h3>Configuración de las reglas</h3>
            <div class="reglas">
                <div class="form-group">
                    <label for="nombre">Paciente seleccionado:</label>
                    <span id="pacienteSeleccionado">Nombre del paciente :D</span>
                </div>
                <div class="form-group">
                    <label for="instrucciones">Numero de instrucciones (1-11): </label>
                    <input type="number" id="instrucciones" name="instrucciones" required>
                </div>

                <div class="form-group">
                    <label for="instrucciones">¿Instrucciones aleatorias?: </label>
                    <select id="instrucciones" name="instrucciones" required>
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <button class="regresar" type="button" class="btn" onclick="window.location.href='tablero.php'">
                    <span>JUGAR!</span>
                </button>
            </div>
        </div>
    </div>

    <script src="../scripts/pacientes.js"></script>
</body>

</html>