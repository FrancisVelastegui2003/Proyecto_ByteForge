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
            <div>
                <button class="opciones-btn">
                    <span class="shadow"></span>
                    <span class="edge"></span>
                    <span class="front">
                        <select id="select-paciente" name="select-paciente">
                            <option value="" disabled selected>Seleccione un paciente</option>
                        </select>
                    </span>
                </button>
            </div>

            <button class="opciones-btn" onclick="window.location.href='registro.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Registrar nuevo paciente </span>
            </button>

            <button class="opciones-btn" onclick="window.location.href='datos_paciente.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Editar / Eliminar Paciente </span>
            </button>

            <button class="opciones-btn" onclick="window.location.href='datos_terapeuta.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Editar / Eliminar Terapeuta </span>
            </button>

            <button class="opciones-btn" onclick="window.location.href='graficoestadisticos.php'">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Ver Estadísticas </span>
            </button>
        </div>

        <div class="configuracion-reglas">
            <h3>Configuración de las reglas</h3>
            <div class="reglas">
                <div class="form-group">
                    <label class="estilo-opciones">Paciente seleccionado:</label>
                    <span id="pacienteSeleccionado"></span>
                </div>
                <div class="form-group">
                    <label class="estilo-opciones">Numero de instrucciones (3-11): </label>
                    <input type="number" id="numInstrucciones" name="numInstrucciones" min="3" max="11" required>
                </div>

                <div class="form-group">
                    <label class="estilo-opciones">¿Instrucciones aleatorias?: </label>
                    <select id="instruccionesAleatorias" name="instruccionesAleatorias" required>
                        <option value="" disabled selected>Seleccione una opción</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="estilo-opciones">Seleccione el tablero:</label>
                </div>

                <div class="image-selector">
                    <label>
                        <input type="radio" name="option" value="tablero1" required>
                        <img src="../img/tablero1.jpg" alt="Opción 1">
                    </label>
                    <label>
                        <input type="radio" name="option" value="tablero2">
                        <img src="../img/tablero2.jpg" alt="Opción 2">
                    </label>
                    <label>
                        <input type="radio" name="option" value="tablero3">
                        <img src="../img/tablero3.jpg" alt="Opción 3">
                    </label>
                    <label>
                        <input type="radio" name="option" value="tablero4">
                        <img src="../img/tablero4.jpg" alt="Opción 4">
                    </label>
                </div>

                <button class="regresar" type="button" class="btn" onclick="handleSelection()">
                    <span>JUGAR!</span>
                </button>
                <p id="result"></p>

            </div>
        </div>
    </div>

    <script>
        // Eliminar el localStorage al cargar la página
        window.onload = function () {
            localStorage.clear(); // Borra todos los datos del localStorage
            console.log("LocalStorage limpiado al iniciar el juego.");
        };
    </script>
    <script src="../scripts/pacientes.js"></script>
    <script src="../scripts/configuracion.js"></script>
</body>

</html>