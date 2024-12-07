document.addEventListener("DOMContentLoaded", () => {
    // Recuperar datos guardados en localStorage
    const totalTime = localStorage.getItem("finalTime");
    const incorrectAttempts = localStorage.getItem("incorrectAttempts");
    const numeroInstrucciones = localStorage.getItem("numeroInstrucciones");
    const pacienteId = localStorage.getItem("pacienteId"); // El ID del paciente seleccionado
    const pacientesData = JSON.parse(localStorage.getItem("pacientesData"));

    // Validar si existen datos en localStorage
    if (!pacienteId || !pacientesData || !Array.isArray(pacientesData)) {
        console.error("No se encontraron datos del paciente o la lista de pacientes en localStorage.");
        alert("No se encontraron datos del paciente. Seleccione un paciente e inténtelo de nuevo.");
        return;
    }

    // Buscar al paciente correspondiente por su ID
    const pacienteData = pacientesData.find(paciente => paciente.cedula === pacienteId);

    if (!pacienteData) {
        console.error("El paciente seleccionado no se encuentra en la lista de pacientes.");
        alert("No se pudo encontrar el paciente seleccionado. Inténtelo nuevamente.");
        return;
    }

    // Mostrar estadísticas en la interfaz
    document.getElementById("tiempo").innerText = totalTime || "No disponible";
    document.getElementById("intentos").innerText = incorrectAttempts || "0";

    // Mostrar datos del paciente
    document.getElementById("pacienteSeleccionado").innerText =
        `${pacienteData.nombre} ${pacienteData.apellido}`;
    document.getElementById("cedula").innerText = pacienteData.cedula;
    document.getElementById("edad").innerText = pacienteData.edad;
    document.getElementById("diagnostico").innerText = pacienteData.diagnostico;

    // Evento para guardar en la base de datos
    const btnGuardar = document.getElementById("btnGuardar");
    btnGuardar.addEventListener("click", () => {
        try {
            // Validar existencia de datos necesarios
            if (!totalTime || !incorrectAttempts || !numeroInstrucciones) {
                alert("Faltan datos para guardar las estadísticas.");
                console.error("Datos faltantes:", {
                    totalTime,
                    incorrectAttempts,
                    numeroInstrucciones
                });
                return;
            }

            // Convertir tiempo a formato TIME (HH:MM:SS)
            const timeParts = totalTime.split(":");
            if (timeParts.length !== 2) {
                throw new Error("El tiempo no tiene el formato correcto MM:SS.");
            }

            const [minutos, segundos] = timeParts.map(num => parseInt(num, 10));
            const tiempoFormateado = `00:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

            // Crear el objeto de estadísticas
            const estadistica = {
                cedula_paciente: pacienteData.cedula,
                tiempo: tiempoFormateado,
                numero_instrucciones: parseInt(numeroInstrucciones, 10),
                numero_intentos_fallidos: parseInt(incorrectAttempts, 10),
                fecha: new Date().toISOString().split("T")[0] // Fecha actual en formato YYYY-MM-DD
            };

            console.log("Datos a enviar al servidor:", JSON.stringify(estadistica));

            // Enviar los datos al servidor
            fetch('guardar_estadistica.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(estadistica)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Respuesta del servidor:", data);
                if (data.success) {
                    alert("¡Estadísticas guardadas exitosamente!");
                } else {
                    alert(`Error al guardar estadísticas: ${data.error}`);
                }
            })
            .catch(error => {
                console.error("Error al enviar los datos:", error);
                alert("Error al conectar con el servidor. Revisa la consola para más detalles.");
            });

        } catch (error) {
            console.error("Error en la preparación de los datos:", error.message);
            alert("Ocurrió un error al preparar los datos. Verifica la consola para más detalles.");
        }
    });
});
