document.addEventListener("DOMContentLoaded", function () {
    cargarPacientes(); // Cargar pacientes al cargar la página
});

// Variables globales para tiempo e intentos
let tiempoTotal = 0;
let intentos = 0;
let intervaloTiempo;

// Función para iniciar una nueva partida
function iniciarNuevaPartida() {
    tiempoTotal = 0;
    intentos = 0;
    actualizarEstadisticas();
    clearInterval(intervaloTiempo); // Detiene el temporizador si estaba en uso
}

// Función para actualizar el tiempo y los intentos en la interfaz
function actualizarEstadisticas() {
    document.getElementById("tiempo").innerText = `${tiempoTotal} segundos`;
    document.getElementById("intentos").innerText = intentos;
}

// Incrementa el contador de intentos y actualiza la interfaz
function incrementarIntentos() {
    intentos += 1;
    actualizarEstadisticas();
}

// Detiene el temporizador y guarda los resultados al final de la partida
function finalizarPartida() {
    clearInterval(intervaloTiempo);
    localStorage.setItem("tiempo", tiempoTotal);
    localStorage.setItem("intentos", intentos);
    alert("Partida finalizada. Estadísticas guardadas.");
}

// Función para cargar los datos del paciente usando su ID o cédula
function cargarDatosPaciente(pacienteId) {
    fetch(`obtener_pacientes.php?id=${pacienteId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("datos-paciente").innerHTML = `<p>${data.error}</p>`;
            } else {
                document.getElementById("datos-paciente").innerHTML = `
                    <p><strong>Nombre:</strong> ${data.nombre}</p>
                    <p><strong>Edad:</strong> ${data.edad}</p>
                    <p><strong>Cédula:</strong> ${data.cedula}</p>
                    <p><strong>Diagnóstico:</strong> ${data.diagnostico}</p>
                `;
            }
        })
        .catch(error => {
            console.error("Error al cargar datos del paciente:", error);
            document.getElementById("datos-paciente").innerHTML = `<p>Error al cargar datos del paciente.</p>`;
        });
}

// Función para buscar paciente por ID o cédula
function buscarPaciente() {
    const pacienteId = document.getElementById("paciente-id").value;
    if (pacienteId) {
        cargarDatosPaciente(pacienteId);
    } else {
        alert("Por favor, ingrese un ID o cédula válida.");
    }
}

// Cargar automáticamente el paciente seleccionado en el tablero inicial si existe
document.addEventListener("DOMContentLoaded", () => {
    const pacienteId = localStorage.getItem("pacienteId");
    if (pacienteId) {
        cargarDatosPaciente(pacienteId);
    }

    iniciarNuevaPartida(); // Inicia una nueva partida al cargar la página
});



