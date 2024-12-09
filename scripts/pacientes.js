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
        });
}
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
                if (pacienteSeleccionado) {
                    pacienteSeleccionado.innerText = nombreSeleccionado;
                }

                const pacientesData = JSON.parse(localStorage.getItem("pacientesData"));
                if (pacientesData && Array.isArray(pacientesData)) {
                    const paciente = pacientesData.find(p => p.cedula === pacienteId);

                    if (paciente) {
                        localStorage.setItem("datosPaciente", JSON.stringify(paciente));
                        console.log("Paciente guardado correctamente:", paciente);
                        document.getElementById('nombre').value = paciente.nombre;
                        document.getElementById('apellido').value = paciente.apellido;
                        document.getElementById('edad').value = paciente.edad;
                        document.getElementById('diagnostico').value = paciente.diagnostico;
                        document.getElementById('cedula').value = paciente.cedula;
            
                    } else {
                        console.error("Paciente no encontrado en la lista de pacientes.");
                    }
                } else {
                    console.error("No se encontraron datos de pacientes en localStorage.");
                }
            }
        });
    }

    document.getElementById('btnActualizar').addEventListener('click', function () {
        const cedula = document.getElementById('cedula').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const edad = document.getElementById('edad').value;
        const diagnostico = document.getElementById('diagnostico').value;

        if (edad <= 0) {
            alert('La edad debe ser mayor que 0');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'actualizar_paciente.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert('Datos actualizados correctamente');
                } else {
                    alert('Error al actualizar los datos: ' + response.error);
                }
            }
        };
        xhr.send(`cedula=${cedula}&nombre=${nombre}&apellido=${apellido}&edad=${edad}&diagnostico=${diagnostico}`);
    });
    document.getElementById('btnEliminar').addEventListener('click', function () {
const cedula = document.getElementById('cedula').value;

if (!cedula) {
alert('Seleccione un paciente para eliminar');
return;
}

if (confirm('¿Está seguro de que desea eliminar este paciente?')) {
const xhr = new XMLHttpRequest();
xhr.open('POST', 'eliminar_paciente.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        try {
            const response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Paciente eliminado correctamente');
                location.reload(); // Recargar la página para actualizar la lista de pacientes
            } else {
                alert('Error al eliminar el paciente: ' + response.error);
            }
        } catch (e) {
            console.error("Error al parsear la respuesta JSON:", e);
            alert("Hubo un error en la respuesta del servidor.");
        }
    }
};
xhr.send(`cedula=${cedula}`);
}
});

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
        });
}