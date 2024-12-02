document.addEventListener("DOMContentLoaded", function () {
    cargarPacientes();

    const selectPaciente = document.getElementById("select-paciente");
    if (selectPaciente) {
        selectPaciente.addEventListener("change", function () {
            const pacienteId = this.value;
            if (pacienteId) {
                localStorage.setItem("pacienteId", pacienteId);
                document.getElementById("pacienteSeleccionado").innerText =
                    selectPaciente.options[selectPaciente.selectedIndex].text;
            }
        });
    }
});

function cargarPacientes() {
    fetch('obtener_pacientes.php')
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los pacientes");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                return;
            }

            const selectPaciente = document.getElementById("select-paciente");
            if (selectPaciente) {
                selectPaciente.innerHTML = '<option value="" disabled selected>Seleccione un paciente</option>';
                data.forEach(paciente => {
                    const option = document.createElement("option");
                    option.value = paciente.id;
                    option.textContent = paciente.nombre;
                    selectPaciente.appendChild(option);
                });
            }
        })
        .catch(error => console.error("Error al cargar pacientes:", error));
}
