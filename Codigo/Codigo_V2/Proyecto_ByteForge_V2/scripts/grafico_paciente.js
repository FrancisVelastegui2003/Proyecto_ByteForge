document.addEventListener("DOMContentLoaded", () => {
    const selectPaciente = document.getElementById("select-paciente");
    const btnGenerar = document.getElementById("btn-generar");
    const tipoDatos = document.getElementById("tipo-datos");
    const fechaInput = document.getElementById("fecha");
    let chartInstance = null;

    // Cargar la lista de pacientes
    fetch("obtener_pacientes.php")
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            data.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.cedula;
                option.textContent = `${paciente.nombre} ${paciente.apellido}`;
                selectPaciente.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar pacientes:", error));

    // Generar el gráfico
    btnGenerar.addEventListener("click", () => {
        const cedula = selectPaciente.value;
        const tipo = tipoDatos.value;
        const fecha = fechaInput.value;

        if (!cedula) {
            alert("Debe seleccionar un paciente.");
            return;
        }

        const params = { cedula, tipo };
        if (tipo === "fecha" && fecha) params.fecha = fecha;

        fetch("obtener_estadisticas.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw new Error(data.error);
                generarGrafico(data);
            })
            .catch(error => console.error("Error al obtener estadísticas:", error));
    });

    // Generar el gráfico combinado
    function generarGrafico(datos) {
        const ctx = document.getElementById("graficoEstadisticas").getContext("2d");

        if (chartInstance) chartInstance.destroy(); // Eliminar gráfico anterior si existe

        // Convertir tiempo a formato minutos:segundos
        const tiemposFormato = datos.map(item => {
            const minutos = Math.floor(item.tiempo_total / 60); // Parte entera de minutos
            const segundos = item.tiempo_total % 60; // Resto en segundos
            return `${minutos}:${segundos.toString().padStart(2, '0')}`; // Formato "mm:ss"
        });

        chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: datos.map(item => item.fecha), // Fechas como etiquetas
                datasets: [
                    {
                        label: "Tiempo (minutos:segundos)",
                        data: datos.map(item => item.tiempo_total), // Tiempo total en segundos (para escala)
                        backgroundColor: "rgba(54, 162, 235, 0.6)", // Azul
                        borderColor: "rgba(54, 162, 235, 1)",
                        yAxisID: 'y',
                    },
                    {
                        label: "Intentos Fallidos",
                        data: datos.map(item => item.numero_intentos_fallidos),
                        backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
                        borderColor: "rgba(255, 99, 132, 1)",
                        yAxisID: 'y1',
                    },
                    {
                        label: "Número de Instrucciones",
                        data: datos.map(item => item.numero_instrucciones),
                        backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde
                        borderColor: "rgba(75, 192, 192, 1)",
                        yAxisID: 'y',
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Tiempo (segundos) e Instrucciones'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: { drawOnChartArea: false },
                        title: {
                            display: true,
                            text: 'Intentos Fallidos'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Progreso del Paciente"
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.dataset.label === "Tiempo (minutos:segundos)") {
                                    const totalSegundos = context.raw; // Tiempo en segundos
                                    const minutos = Math.floor(totalSegundos / 60);
                                    const segundos = totalSegundos % 60;
                                    label += `${minutos}:${segundos.toString().padStart(2, '0')}`;
                                } else {
                                    label += context.raw;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
});
