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

                // Opcional: Guardar todos los datos del paciente en localStorage
                const pacientes = JSON.parse(localStorage.getItem("pacientesData"));
                const paciente = pacientes.find(p => p.cedula === pacienteId);
                localStorage.setItem("datosPaciente", JSON.stringify(paciente));
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
            if (data.error) {
                console.error(data.error);
                return;
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
        .catch(error => console.error("Error:", error.message));
}
