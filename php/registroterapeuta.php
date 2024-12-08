<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro Terapeuta</title>
    <link rel="icon" href="../img/logo.png" type="image/png">
    <link rel="stylesheet" href="../css/styles.css">
</head>

<body>
    <h2>
        <button class="BytePrensión">
            <span>BytePrensión</span>
        </button>
    </h2>
    <div class="registro-container">
        <h2>Registro Terapeuta</h2>

        <form action="guardar_terapeuta.php" method="POST">
            <div class="form-group">
                <label for="cedula">Cédula</label>
                <input type="number" id="cedula" name="cedula" required>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
                <label for="apellido">Apellido</label>
                <input type="text" id="apellido" name="apellido" required>
            </div>
            <div class="form-group">
                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required>
            </div>
            <div class="botones">
                <button class="regresar" type="submit" class="btn" onclick="window.location.href='configuracion.php'">
                    <span>Guardar</span>
                </button>
                <button class="regresar" type="button" class="btn" onclick="window.location.href='../index.html'">
                    <span>Salir</span>
                </button>
            </div>
        </form>
    </div>
</body>

</html>