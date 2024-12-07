<?php
include 'auth_check.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar o Eliminar Paciente</title>
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
                    <span>Datos del paciente</span>
                </button>
            </h1>
        </div>
        <div>
            
        </div>
    </div>

    <div class="estadistica-container">

        <!-- Información del Paciente -->
        <div class="info-paciente">
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

            <button class="opciones-btn">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Eliminar paciente </span>
            </button>
            
            
        </div>

        
        <div class="estadisticas-detalle">


        <!-- Datos del Paciente -->

            
        </div>

        <script src="../scripts/pacientes.js"></script>
</body>

</html>