<?php
include 'conexion.php';
session_start([
    'cookie_lifetime' => 0, // La cookie expirará al cerrar el navegador
]);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cedula = $_POST['cedula'];
    $contrasena = $_POST['contrasena'];

    $query = "SELECT contrasena FROM terapeuta WHERE cedula = ?";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("s", $cedula);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashedPassword);
        $stmt->fetch();

        if (password_verify($contrasena, $hashedPassword)) {
            // Credenciales válidas: iniciar sesión
            $_SESSION['usuario'] = $cedula; // Almacenar identificador del usuario
            $_SESSION['ultimo_acceso'] = time(); // Registrar tiempo de acceso
            header("Location: configuracion.php");
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
    header("Location: iniciarsesion.php");
    exit();
}
?>
