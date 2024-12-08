document.addEventListener("DOMContentLoaded", () => {
    const totalTime = localStorage.getItem("finalTime");
    const incorrectAttempts = localStorage.getItem("incorrectAttempts");
    const numeroInstrucciones = localStorage.getItem("numeroInstrucciones");
    const pacienteData = JSON.parse(localStorage.getItem("datosPaciente"));

    if (!pacienteData) {
        console.error("No se encontraron datos del paciente en localStorage.");
        alert("Debe seleccionar un paciente antes de continuar.");
        return;
    }

    document.getElementById("tiempo").innerText = totalTime || "No disponible";
    document.getElementById("intentos").innerText = incorrectAttempts || "0";
    document.getElementById("pacienteSeleccionado").innerText =
        `${pacienteData.nombre} ${pacienteData.apellido}`;
    document.getElementById("cedula").innerText = pacienteData.cedula;
    document.getElementById("edad").innerText = pacienteData.edad;
    document.getElementById("diagnostico").innerText = pacienteData.diagnostico;

    const btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", () => {
        if (!totalTime || !incorrectAttempts || !numeroInstrucciones) {
            alert("Faltan datos para guardar las estadísticas.");
            return;
        }

        const [minutos, segundos] = totalTime.split(":").map(num => parseInt(num, 10));
        const tiempoFormateado = `00:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

        const estadistica = {
            cedula_paciente: pacienteData.cedula,
            tiempo: tiempoFormateado,
            numero_instrucciones: parseInt(numeroInstrucciones, 10),
            numero_intentos_fallidos: parseInt(incorrectAttempts, 10),
            fecha: new Date().toISOString().split("T")[0]
        };

        console.log("Datos a enviar al servidor:", estadistica);

        fetch('guardar_estadistica.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estadistica)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("¡Estadísticas guardadas exitosamente!");
            } else {
                alert(`Error al guardar estadísticas: ${data.error}`);
            }
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
            alert("Error al conectar con el servidor.");
        });
    });
});
