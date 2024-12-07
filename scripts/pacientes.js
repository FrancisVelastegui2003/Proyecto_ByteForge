document.addEventListener("DOMContentLoaded", function () {
    cargarPacientes();

    const selectPaciente = document.getElementById("select-paciente");
    const pacienteSeleccionado = document.getElementById("pacienteSeleccionado");

    // Al seleccionar un paciente, mostrar su nombre completo
    if (selectPaciente) {
        selectPaciente.addEventListener("change", function () {
            const pacienteId = this.value;
            const nombreSeleccionado = this.options[this.selectedIndex].text;

            if (pacienteId) {
                localStorage.setItem("pacienteId", pacienteId);
                pacienteSeleccionado.innerText = nombreSeleccionado;

                // Obtener todos los pacientes guardados
                const pacientesData = localStorage.getItem("pacientesData");
                if (pacientesData) {
                    try {
                        const pacientes = JSON.parse(pacientesData);
                        const paciente = pacientes.find(p => p.cedula === pacienteId);

                        if (paciente) {
                            localStorage.setItem("datosPaciente", JSON.stringify(paciente));
                            console.log("Paciente guardado en localStorage:", paciente);
                        } else {
                            console.error("Paciente no encontrado en pacientesData.");
                            alert("No se pudo encontrar el paciente seleccionado.");
                        }
                    } catch (error) {
                        console.error("Error al parsear pacientesData:", error);
                    }
                } else {
                    console.error("No se encontraron datos de pacientes en localStorage.");
                    alert("No hay datos de pacientes disponibles. Recargue la página.");
                }
            }
        });
    }
});

// Función para cargar pacientes
function cargarPacientes() {
    fetch('obtener_pacientes.php')
        .then(response => {
            if (!response.ok) throw new Error('Error al obtener pacientes');
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error('No se recibieron datos de pacientes.');
            }

            // Guardar todos los datos en localStorage para usarlos posteriormente
            localStorage.setItem("pacientesData", JSON.stringify(data));

            const selectPaciente = document.getElementById("select-paciente");
            selectPaciente.innerHTML = '<option value="" disabled selected>Seleccione un paciente</option>';

            // Llenar el selector con nombre y apellido
            data.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.cedula;
                option.textContent = `${paciente.nombre} ${paciente.apellido}`;
                selectPaciente.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error:", error.message);
            alert("No se pudieron cargar los pacientes. Verifica la conexión con el servidor.");
        });
}
