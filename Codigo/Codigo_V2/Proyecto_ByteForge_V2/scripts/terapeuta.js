function actualizarTerapeuta() {
    const form = document.getElementById("formEditarTerapeuta");
    const formData = new FormData(form);

    fetch("actualizar_terapeuta.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Mostrar mensaje de éxito
        alert(data);

        // Obtener los nuevos datos del formulario
        const nuevoNombre = formData.get("nombre");
        const nuevoApellido = formData.get("apellido");

        // Actualizar la sección "TERAPEUTA LOGUEADO" con los nuevos datos
        const nombreTerapeutaSpan = document.getElementById("nombre-terapeuta");
        nombreTerapeutaSpan.textContent = `${nuevoNombre} ${nuevoApellido}`;
    })
    .catch(error => {
        console.error("Error al actualizar los datos del terapeuta:", error);
        alert("Hubo un error al actualizar los datos.");
    });
}


function eliminarTerapeuta() {
    if (confirm("¿Está seguro de que desea eliminar sus datos? Esta acción no se puede deshacer.")) {
        fetch("eliminar_terapeuta.php", {
            method: "POST",
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.href = "index.html"; // Redirigir a la página de inicio
        })
        .catch(error => {
            console.error("Error al eliminar los datos del terapeuta:", error);
            alert("Hubo un error al intentar eliminar los datos.");
        });
    }
}
