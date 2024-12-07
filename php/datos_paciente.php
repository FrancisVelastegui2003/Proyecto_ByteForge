<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos de pacientes</title>
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <h2>
        <button class="BytePrensión">
            <span>Editar / Eliminar Paciente</span>
        </button>
    </h2>
    <div class="editar-eliminar">
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
        </div>


        <div class="registro-container">
            <h2>Datos del paciente</h2>

            <!-- CORREGIR DATOS  -->
            <form action="guardar_paciente.php" method="POST">
                <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" required>
                </div>
                <div class="form-group">
                    <label for="apellido">Apellido</label>
                    <input type="text" id="apellido" name="apellido" required>
                </div>
                <div class="form-group">
                    <label for="edad">Edad</label>
                    <input type="number" id="edad" name="edad" min="1" required>
                </div>
                <div class="form-group">
                    <label for="diagnostico">Diagnóstico</label>
                    <input type="text" id="diagnostico" name="diagnostico" required>
                </div>
                <div class="form-group">
                    <label for="id">Cedula Paciente</label>
                    <input type="number" id="id" name="id" required>
                </div>
                <div class="form-group">
                    <label for="id_terapeuta">Cedula Terapeuta a cargo</label>
                    <input type="number" id="id" name="id_terapeuta" required>
                </div>
                <div class="botones">
                    <button class="regresar" type="submit" class="btn"
                        onclick="window.location.href='configuracion.php'">
                        <span>Guardar</span>
                    </button>
                    <button class="regresar" type="button" class="btn"
                        onclick="window.location.href='configuracion.php'">
                        <span>Salir</span>
                    </button>
                </div>
            </form>
        </div>
    </div>


    <script src="../scripts/pacientes.js"></script>
</body>

</html>