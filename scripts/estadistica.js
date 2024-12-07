document.addEventListener("DOMContentLoaded", () => {
    const totalTime = localStorage.getItem("tiempoJuego");
    const incorrectAttempts = localStorage.getItem("intentosIncorrectos");

    alert(`Tiempo total: ${totalTime}\nIntentos incorrectos: ${incorrectAttempts}`);
});
