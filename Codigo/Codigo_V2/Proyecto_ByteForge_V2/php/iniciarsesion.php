<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
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
        <h2>Iniciar Sesión</h2>

        <form action="procesar_login.php" method="POST" id="loginForm">
            <div class="form-group">
                <label for="cedula">No. Cédula</label>
                <input type="text" id="cedula" name="cedula" required>
            </div>
            <div class="form-group">
                <label for="contrasena">Contraseña</label>
                <input type="password" id="contrasena" name="contrasena" required>
            </div>
            <div class="botones">
                <button class="regresar" type="submit" class="btn">
                    <span>Ingresar</span>
                </button>
                <button class="regresar" type="button" class="btn" onclick="window.location.href='../index.html'">
                    <span>Salir</span>
                </button>
            </div>
        </form>

        <!-- Mensaje de error dinámico mediante JavaScript -->
        <p id="errorMessage" style="color: red; display: none; font-weight: bold;"><br>Usuario o contraseña incorrectos. Inténtelo de nuevo.</p>
    </div>

    <script>
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('error') === '1') {
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.style.display = 'block';
        }
    </script>
</body>
</html>