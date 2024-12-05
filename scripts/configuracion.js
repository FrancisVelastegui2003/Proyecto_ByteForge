function handleSelection() {
    // Obtener los valores de los campos
    //const selectedPatient = document.getElementById("select-paciente").value;
    const numInstrucciones = document.getElementById("numInstrucciones").value;
    const instruccionesAleatorias = document.getElementById("instruccionesAleatorias").value;
    const selectedOption = document.querySelector('input[name="option"]:checked').value;

    // Validar cada campo
    /*if (!selectedPatient) {
        alert("Por favor, selecciona un paciente.");
        return;
    }*/
    if (!instruccionesAleatorias || instruccionesAleatorias < 3 || instruccionesAleatorias > 11) {
        alert("Por favor, ingresa un número de instrucciones válido (entre 3 y 11).");
        return;
    }
    if (!instruccionesAleatorias) {
        alert("Por favor, selecciona si las instrucciones serán aleatorias o no.");
        return;
    }
    
    if (!selectedOption) {
        alert("Por favor, selecciona un tablero antes de continuar.");
        return;
    }


    const configuracion = {
        numInstrucciones,
        instruccionesAleatorias: instruccionesAleatorias === "si",
        selectedOption
    };

    // Guardar en localStorage
    localStorage.setItem("configuracion", JSON.stringify(configuracion));
    alert("¡Configuración guardada correctamente!");

    /* Si todos los campos están completos, guardar la selección y redirigir
    const selectedValue = selectedOption.value; // Valor del tablero seleccionado
    localStorage.setItem("selectedOption", selectedValue);
    localStorage.setItem("selectedPatient", selectedPatient);
    localStorage.setItem("instrucciones", instrucciones);
    localStorage.setItem("instruccionesAleatorias", instruccionesAleatorias);
    */

    // Redirigir al usuario a la página de juego
    window.location.href = "tablero.php";
}
