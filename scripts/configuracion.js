function handleSelection() {
    const pacienteId = localStorage.getItem("pacienteId");
    const numInstrucciones = document.getElementById("numInstrucciones").value;
    const instruccionesAleatorias = document.getElementById("instruccionesAleatorias").value;
    const tableroSeleccionado = document.querySelector('input[name="option"]:checked'); // Selección del tablero

    // Validaciones
    if (!pacienteId || pacienteId.trim() === "") {
        alert("Por favor, seleccione un paciente.");
        return;
    }
    
    if (!numInstrucciones || numInstrucciones < 3 || numInstrucciones > 11) {
        alert("Por favor, ingrese un número válido de instrucciones (entre 3 y 11).");
        return;
    }
    if (!instruccionesAleatorias) {
        alert("Por favor, seleccione si las instrucciones serán aleatorias.");
        return;
    }
    if (!tableroSeleccionado) {
        alert("Por favor, seleccione un tablero.");
        return;
    }

    // Guardar configuración en localStorage
    const configuracion = {
        pacienteId,
        pacienteNombre: localStorage.getItem("pacienteNombre"),
        numInstrucciones,
        instruccionesAleatorias: instruccionesAleatorias === "si",
        tablero: tableroSeleccionado.value
    };

    console.log("Configuración guardada:", configuracion); // Depuración
    localStorage.setItem("configuracionJuego", JSON.stringify(configuracion));
    alert(`¡Configuración guardada! Tablero seleccionado: ${tableroSeleccionado.value}`);

    // Redirigir al tablero
    window.location.href = "../php/tablero.php";
}
