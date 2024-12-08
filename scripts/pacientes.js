document.addEventListener("DOMContentLoaded", function () {
    cargarPacientes();

    const selectPaciente = document.getElementById("select-paciente");
    const pacienteSeleccionado = document.getElementById("pacienteSeleccionado");

    if (selectPaciente) {
        selectPaciente.addEventListener("change", function () {
            const pacienteId = this.value;
            const nombreSeleccionado = this.options[this.selectedIndex].text;

            if (pacienteId) {
                localStorage.setItem("pacienteId", pacienteId);
                pacienteSeleccionado.innerText = nombreSeleccionado;

                const pacientesData = JSON.parse(localStorage.getItem("pacientesData"));
                if (pacientesData && Array.isArray(pacientesData)) {
                    const paciente = pacientesData.find(p => p.cedula === pacienteId);

                    if (paciente) {
                        localStorage.setItem("datosPaciente", JSON.stringify(paciente));
                        console.log("Paciente guardado correctamente:", paciente);
                    } else {
                        console.error("Paciente no encontrado en la lista de pacientes.");
                    }
                } else {
                    console.error("No se encontraron datos de pacientes en localStorage.");
                }
            }
        });
    }
});

function cargarPacientes() {
    fetch('obtener_pacientes.php')
        .then(response => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error('No se recibieron datos de pacientes.');
            }

            localStorage.setItem("pacientesData", JSON.stringify(data));

            const selectPaciente = document.getElementById("select-paciente");
            selectPaciente.innerHTML = '<option value="" disabled selected>Seleccione un paciente</option>';

            data.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.cedula;
                option.textContent = `${paciente.nombre} ${paciente.apellido}`;
                selectPaciente.appendChild(option);
            });

            console.log("Lista de pacientes cargada correctamente.");
        })
        .catch(error => {
            console.error("Error al cargar pacientes:", error);
            alert("No se pudo cargar la lista de pacientes. Verifique la conexión.");
        });
}
