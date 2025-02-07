document.addEventListener("DOMContentLoaded", () => {
    // Recupera los datos almacenados en localStorage
    const totalTime = localStorage.getItem("finalTime");
    const incorrectAttempts = localStorage.getItem("incorrectAttempts");
    const numeroInstrucciones = localStorage.getItem("numeroInstrucciones");
    const pacienteData = JSON.parse(localStorage.getItem("datosPaciente"));

    // Verifica si hay datos del paciente almacenados
    if (!pacienteData) {
        console.error("No se encontraron datos del paciente en localStorage.");
        alert("Debe seleccionar un paciente antes de continuar.");
        return;
    }

    // Muestra los datos recuperados en los elementos HTML correspondientes
    document.getElementById("tiempo").innerText = totalTime || "No disponible";
    document.getElementById("intentos").innerText = incorrectAttempts || "0";
    document.getElementById("instrucciones").innerText = numeroInstrucciones || "0";
    document.getElementById("pacienteSeleccionado").innerText =
        `${pacienteData.nombre} ${pacienteData.apellido}`;
    document.getElementById("cedula").innerText = pacienteData.cedula;
    document.getElementById("edad").innerText = pacienteData.edad;
    document.getElementById("diagnostico").innerText = pacienteData.diagnostico;

    // Agrega un evento al botón de guardar estadísticas
    const btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", () => {
        // Verifica que todos los datos necesarios estén disponibles antes de continuar
        if (!totalTime || !incorrectAttempts || !numeroInstrucciones) {
            alert("Faltan datos para guardar las estadísticas.");
            return;
        }

        // Convierte el tiempo en el formato requerido "00:mm:ss"
        const [minutos, segundos] = totalTime.split(":").map(num => parseInt(num, 10));
        const tiempoFormateado = `00:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

        // Crea el objeto con los datos de la estadística a enviar al servidor
        const estadistica = {
            cedula_paciente: pacienteData.cedula,
            tiempo: tiempoFormateado,
            numero_instrucciones: parseInt(numeroInstrucciones, 10),
            numero_intentos_fallidos: parseInt(incorrectAttempts, 10),
            fecha: new Date().toISOString().split("T")[0] // Obtiene la fecha actual en formato "YYYY-MM-DD"
        };

        console.log("Datos a enviar al servidor:", estadistica);

        // Realiza una solicitud HTTP para enviar los datos al servidor
        fetch('guardar_estadistica.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estadistica)
        })
        .then(response => response.json())
        .then(data => {
            // Si la respuesta del servidor es exitosa, muestra un mensaje y redirige a la configuración
            if (data.success) {
                alert("¡Estadísticas guardadas exitosamente!");
                window.location.href = "../php/configuracion.php"; // Redirige a configuracion.php
            } else {
                alert(`Error al guardar estadísticas: ${data.error}`);
            }
        })
        .catch(error => {
            // Manejo de errores en caso de problemas con la solicitud HTTP
            console.error("Error al enviar los datos:", error);
            alert("Error al conectar con el servidor.");
        });
    });
});
