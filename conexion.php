<?php
// Configuración de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "JuegoDB";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si se enviaron datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $edad = $_POST["edad"];

    // Insertar datos en la tabla PACIENTE
    $sql = "INSERT INTO PACIENTE (id, nombre, apellido, edad) VALUES ('$id', '$nombre', '$apellido', $edad)";

    if ($conn->query($sql) === TRUE) {
        echo "Paciente agregado exitosamente";
    } else {
        echo "Error al agregar paciente: " . $conn->error;
    }
}

// Cerrar conexión
$conn->close();
?>
