<?php
session_start([
    'cookie_lifetime' => 0, // La cookie expirará al cerrar el navegador
]);

// Configurar el tiempo de vida de la sesión en segundos
$tiempo_inactividad = 1800; // Tiempo en segundos (ejemplo: 30 minutos)

// Verificar si existe una sesión activa y si ha expirado
if (isset($_SESSION['ultimo_acceso'])) {
    $tiempo_transcurrido = time() - $_SESSION['ultimo_acceso'];
    if ($tiempo_transcurrido > $tiempo_inactividad) {
        // Si el tiempo de inactividad supera el límite, destruir la sesión
        session_unset();
        session_destroy();
        header("Location: ../index.html"); // Redirigir al inicio
        exit();
    }
}
$_SESSION['ultimo_acceso'] = time(); // Actualizar tiempo de acceso

// Verificar si el usuario está autenticado
if (!isset($_SESSION['terapeuta_id'])) {
    header("Location: ../index.html"); // Redirigir al inicio
    exit();
}

// Ahora $_SESSION['terapeuta_id'] contiene la cédula del terapeuta loggeado
?>
