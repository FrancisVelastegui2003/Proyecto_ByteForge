<?php
include 'conexion.php';
include 'auth_check.php';

if (isset($_POST['cedula'])) {
    $cedula = $_POST['cedula'];
    $query = "SELECT * FROM paciente WHERE cedula = '$cedula'";
    $result = mysqli_query($conexion, $query);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'No se encontraron datos']);
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar o Eliminar Paciente</title>
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
                            <?php
                            // Mostrar pacientes
                            $query = "SELECT * FROM paciente";
                            $result = mysqli_query($conexion, $query);
                            while ($row = mysqli_fetch_assoc($result)) {
                                echo "<option value='" . $row['cedula'] . "'>" . $row['nombre'] . "</option>";
                            }
                            ?>
                        </select>
                    </span>
                </button>
            </div>

            <button class="opciones-btn" id="btnEliminar">
                <span class="shadow"></span>
                <span class="edge"></span>
                <span class="front"> Eliminar paciente </span>
            </button>
        </div>

        <!-- Datos del Paciente -->
        <div class="estadisticas-detalle">
            <div class="container-EditarPaciente">
                <form id="formEditarPaciente">
                    <label class="estilo-opciones">NOMBRE:</label>
                    <input class="estilo-opciones" type="text" id="nombre" name="nombre" value="" required>

                    <label class="estilo-opciones">APELLIDO:</label>
                    <input class="estilo-opciones" type="text" id="apellido" name="apellido" value="" required> <br>

                    <label class="estilo-opciones">EDAD:</label>
                    <input class="estilo-opciones" type="number" id="edad" name="edad" value="" required min="1"> <br>

                    <label class="estilo-opciones">CÉDULA:</label>
                    <input class="estilo-opciones" type="text" id="cedula" name="cedula" value="" disabled> <br>

                    <label class="estilo-opciones">DIAGNÓSTICO:</label>
                    <textarea class="estilo-opciones" id="diagnostico" name="diagnostico" required></textarea> <br>

                    <button class="opciones-btn" type="button" id="btnActualizar">
                        <span class="shadow"></span>
                        <span class="edge"></span>
                        <span class="front"> Actualizar Datos </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
    <script src="../scripts/pacientes.js"></script>
</body>

</html>