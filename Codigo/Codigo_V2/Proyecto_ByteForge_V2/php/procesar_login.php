<?php
include 'conexion.php';
session_start([
    'cookie_lifetime' => 0, // La cookie expirará al cerrar el navegador
]);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula']; // Cédula ingresada en el formulario
    $contrasena = $_POST['contrasena']; // Contraseña ingresada en el formulario

    // Consultar al terapeuta por su cédula
    $query = "SELECT nombre, contrasena FROM terapeuta WHERE cedula = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Usuario encontrado, verificar contraseña
        $stmt->bind_result($nombre_terapeuta, $hashedPassword);
        $stmt->fetch();

        if (password_verify($contrasena, $hashedPassword)) {
            // Credenciales válidas: guardar información del terapeuta en sesión
            $_SESSION['terapeuta_id'] = $cedula; // Guardar la cédula del terapeuta
            $_SESSION['nombre_terapeuta'] = $nombre_terapeuta; // Guardar nombre del terapeuta
            $_SESSION['ultimo_acceso'] = time(); // Registrar tiempo de acceso

            header("Location: configuracion.php"); // Redirigir al panel principal
            exit();
        } else {
            // Contraseña incorrecta
            header("Location: iniciarsesion.php?error=1");
            exit();
        }
    } else {
        // Usuario no encontrado
        header("Location: iniciarsesion.php?error=1");
        exit();
    }

    $stmt->close();
    $conexion->close();
} else {
    header("Location: iniciarsesion.php"); // Redirigir si se accede directamente al script
    exit();
}
?>
