// Posiciones estáticas de elementos
const tablero = {
    tablero1: {
        // Posiciones estáticas de elementos
        starPosition: { row: 1, col: 6 },
        blackPosition: { row: 3, col: 0 },
        numberPositions: {
            15: { row: 4, col: 1 },
            50: { row: 2, col: 3 },
            21: { row: 2, col: 9 },
            48: { row: 4, col: 5 }
        }
    },

    tablero2: {
        // Posiciones estáticas de elementos
        starPosition: { row: 2, col: 0 },
        blackPosition: { row: 3, col: 2 },
        numberPositions: {
            15: { row: 4, col: 5 },
            50: { row: 0, col: 8 },
            21: { row: 1, col: 4 },
            48: { row: 3, col: 9 }
        }
    },

    tablero3: {
        // Posiciones estáticas de elementos
        starPosition: { row: 3, col: 1 },
        blackPosition: { row: 3, col: 6 },
        numberPositions: {
            15: { row: 3, col: 2 },
            50: { row: 1, col: 7 },
            21: { row: 3, col: 8 },
            48: { row: 2, col: 4 }
        }
    },

    tablero4: {
        // Posiciones estáticas de elementos
        starPosition: { row: 4, col: 8 },
        blackPosition: { row: 1, col: 2 },
        numberPositions: {
            15: { row: 1, col: 8 },
            50: { row: 1, col: 4 },
            21: { row: 1, col: 0 },
            48: { row: 4, col: 2 }
        }
    },
};

const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");
const cellSize = 50;
const rows = 5;
const cols = 10;

// Selecciona las posiciones desde el tablero
let { starPosition, blackPosition, numberPositions } = tablero.tablero1;

let tableroSeleccionado;
let selectedColor = "";
let drawTriangleMode = false;
let textInputMode = false;
let incorrectAttempts = 0;
let completedInstructions = 0;
let startTime;
let activeInstructions = [];
let numInstrucciones = 1;
let instruccionesAleatorias = false;


const instructions = [
    { text: "Colorea de rojo la casilla que está encima de la estrella.", color: "#FF0000", check: checkAboveStar },
    { text: "Colorea de café la casilla que está a la derecha de la que tiene el número 15.", color: "#8B4513", check: checkRightOfNumber(15) },
    { text: "Escribe la primera letra de tu nombre encima de la casilla negra.", textInput: true, check: checkAboveBlack },
    { text: "Colorea de verde la casilla derecha al lado del número 50.", color: "#008000", check: checkSidesOfNumber(50) },
    { text: "Colorea de rosado la casilla de la primera fila y cuarta columna.", color: "#FFC0CB", check: checkFirstRowFourthCol },
    { text: "Colorea de amarillo la casilla encima de la que tiene el número 21.", color: "#FFFF00", check: checkAboveAndBelowOfNumber(21) },
    { text: "Colorea de morado la casilla que está debajo de la negra.", color: "#800080", check: checkBelowBlack },
    { text: "Escribe el número de hijos que tienes en la cuarta fila y octava columna.", textInput: true, check: checkFourthRowEighthCol },
    { text: "Colorea de celeste la casilla encima de la que tiene el número igual a la multiplicación 16 x 3.", color: "#ADD8E6", check: checkAboveMultiplication },
    { text: "Dibuja un triángulo en la casilla que está al lado izquierdo de 48.", drawTriangle: true, check: checkLeftOfNumber(48) },
    { text: "Escribe la séptima letra del abecedario en la segunda fila y segunda columna.", textInput: true, check: checkSecondRowSecondCol }
];

function cargarConfiguracion() {
    // Usar la misma clave que se utiliza en handleSelection()
    const configuracion = JSON.parse(localStorage.getItem("configuracionJuego"));

    if (!configuracion || !configuracion.tablero) {
        alert("No se encontraron configuraciones. Redirigiendo a la configuración...");
        window.location.href = "../php/configuracion.php";
        return;
    }

    // Seleccionar el tablero adecuado basado en la configuración
    tableroSeleccionado = tablero[configuracion.tablero];

    if (!tableroSeleccionado) {
        alert("Error al cargar el tablero. Selección inválida.");
        return;
    }

    // Actualizar referencias directamente
    starPosition = { ...tableroSeleccionado.starPosition };
    blackPosition = { ...tableroSeleccionado.blackPosition };
    numberPositions = { ...tableroSeleccionado.numberPositions };

    numInstrucciones = configuracion.numInstrucciones;
    instruccionesAleatorias = configuracion.instruccionesAleatorias;

    // Dibujar el tablero y configurar instrucciones
    drawBoard();
    configureInstructions(numInstrucciones, instruccionesAleatorias);
}


document.addEventListener("DOMContentLoaded", function () {
    initializeGame();
    cargarConfiguracion();
    setupReglasForm();
    configureInstructions();
    //initializeGame();
    displayCurrentInstruction();
});

function setupReglasForm() {
    // Obtén los valores del formulario
    numInstrucciones = parseInt(document.getElementById("numInstrucciones").value, 10);
    instruccionesAleatorias = document.getElementById("instruccionesAleatorias").value === "si";

    // Configura las instrucciones según el formulario
    configureInstructions(numInstrucciones, instruccionesAleatorias);
}

function configureInstructions(num = 1, aleatorias = false) {
    console.log("Configurando instrucciones con:", { num, aleatorias });
    activeInstructions = [...instructions];

    if (aleatorias) {
        shuffleInstructions(activeInstructions); // Baraja las instrucciones si es necesario
    }

    activeInstructions = activeInstructions.slice(0, Math.min(num, activeInstructions.length)); // Recorta al número solicitado
    completedInstructions = 0;
    incorrectAttempts = 0;

    // Guardar el número de instrucciones en localStorage
    localStorage.setItem("numeroInstrucciones", num);

    if (activeInstructions.length > 0) {
        console.log("Instrucciones configuradas:", activeInstructions);
        displayCurrentInstruction(); // Muestra la primera instrucción
    } else {
        alert("No hay instrucciones configuradas. Por favor, configura las reglas del juego.");
    }
}

// Función para barajar las instrucciones de forma aleatoria
function shuffleInstructions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
    }
}

// Inicializa el juego: dibuja tablero, carga instrucciones y temporizador
function initializeGame() {
    drawBoard();
    startTimer();

}
// Dibuja el tablero y los elementos estáticos
function drawBoard() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(starPosition.row, starPosition.col, { type: 'star' });
    drawElement(blackPosition.row, blackPosition.col, { type: 'black' });

    Object.entries(numberPositions).forEach(([number, position]) => {
        drawElement(position.row, position.col, { type: 'number', value: Number(number) });
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

// Muestra la instrucción actual (una a la vez)
function displayCurrentInstruction() {
    const instructionContainer = document.getElementById("instruction");
    if (completedInstructions < activeInstructions.length) {
        instructionContainer.innerText = activeInstructions[completedInstructions].text;
    } else {
        instructionContainer.innerText = "¡Has completado todas las instrucciones!";
    }
}

// Dibuja elementos en el tablero
function drawElement(row, col, element) {
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";

    if (element.type === 'number') {
        ctx.fillText(element.value, x + cellSize / 4, y + cellSize / 1.5);
    } else if (element.type === 'star') {
        drawStar(x + cellSize / 2, y + cellSize / 2, 5, 15, 6);
    } else if (element.type === 'black') {
        ctx.fillRect(x, y, cellSize, cellSize);
    }
}

// Dibuja una estrella
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.closePath();
    ctx.fill();
}

// Configura interacción: seleccionar color, triángulo o texto
function setColor(color) {
    selectedColor = color;
    drawTriangleMode = false;
    textInputMode = false;
}

function drawTriangle() {
    drawTriangleMode = true;
    selectedColor = "";
    textInputMode = false;
}

function enableTextInput() {
    textInputMode = true;
    selectedColor = "";
    drawTriangleMode = false;
}

// Maneja clics en el lienzo
canvas.addEventListener("click", (event) => {
    const { row, col } = getCellFromEvent(event);

    if (selectedColor === "clear") {
        clearCell(row, col); // Limpia la celda seleccionada
    } else if (selectedColor) {
        colorCell(row, col, selectedColor);
        checkConditions(row, col, selectedColor);
    } else if (drawTriangleMode) {
        drawTriangleInCell(row, col);
        checkConditions(row, col, "triangle");
    } else if (textInputMode) {
        const text = prompt("Escribe el texto que deseas agregar:");
        if (text) {
            writeOnCell(row, col, text);
            checkConditions(row, col, text);
        }
    }
});

// Determina la celda del clic
function getCellFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    return { col: Math.floor(x / cellSize), row: Math.floor(y / cellSize) };
}

// Funciones auxiliares para modificar el tablero
function colorCell(row, col, color) {
    ctx.fillStyle = color;
    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
}

function drawTriangleInCell(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 2, y + cellSize / 4);
    ctx.lineTo(x + cellSize / 4, y + 3 * cellSize / 4);
    ctx.lineTo(x + 3 * cellSize / 4, y + 3 * cellSize / 4);
    ctx.closePath();
    ctx.fill();
}

function writeOnCell(row, col, text) {
    ctx.fillText(text, col * cellSize + cellSize / 3, row * cellSize + cellSize / 1.5);
}

function clearCell(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;

    // Limpiar el contenido de la celda específica
    ctx.clearRect(x, y, cellSize, cellSize);

    // Redibujar los bordes de la celda para mantener el aspecto del tablero
    ctx.strokeRect(x, y, cellSize, cellSize);
}


// Verifica si la acción cumple con la condición de la instrucción actual
function checkConditions(row, col, action) {
    const currentInstruction = activeInstructions[completedInstructions];

    if (currentInstruction && currentInstruction.check(row, col, action)) {
        completedInstructions++;

        // Mostrar mensaje de éxito
        displaySuccessMessage(`¡Instrucción completada correctamente! (${completedInstructions}/${activeInstructions.length})`);

        if (completedInstructions === activeInstructions.length) {
            stopTimer();
            alert("¡Has completado todas las instrucciones!");
            document.getElementById("timer").textContent = "Juego completado";
        } else {
            displayCurrentInstruction();
        }
    } else {
        incrementIncorrectAttempts();
    }
}

// Nueva función para mostrar el mensaje de éxito
function displaySuccessMessage(message) {
    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = message;

    // Efecto visual de resaltado temporal
    successMessage.style.transition = "all 0.5s ease";
    successMessage.style.transform = "scale(1.1)";
    setTimeout(() => {
        successMessage.style.transform = "scale(1)";
    }, 500);
}

function stopTimer() {
    cancelAnimationFrame(timerRequest);
    document.getElementById("timer").classList.remove("hidden");
}

// Incrementa el contador de intentos incorrectos
function incrementIncorrectAttempts() {
    incorrectAttempts++;
    document.getElementById("attemptCounter").innerText = `Intentos incorrectos: ${incorrectAttempts}`;
}

// Muestra notificaciones al usuario
function showNotification(message) {
    const notificationElement = document.getElementById("notification");
    notificationElement.innerText = message;
    setTimeout(() => {
        notificationElement.innerText = "";
    }, 3000);
}

// Funciones de verificación para las instrucciones
function checkAboveStar(row, col, color) {
    return color === "#FF0000" && row === starPosition.row - 1 && col === starPosition.col;
}

function checkRightOfNumber(number) {
    return (row, col, color) => {
        const pos = numberPositions[number];
        return color === "#8B4513" && row === pos.row && col === pos.col + 1;
    };
}

function checkAboveBlack(row, col, text) {
    return text && row === blackPosition.row - 1 && col === blackPosition.col;
}

function checkSidesOfNumber(number) {
    return (row, col, color) => {
        const pos = numberPositions[number];
        return color === "#008000" && row === pos.row && col === pos.col + 1;
    };
}

function checkFirstRowFourthCol(row, col, color) {
    return color === "#FFC0CB" && row === 0 && col === 3;
}

function checkAboveAndBelowOfNumber(number) {
    return (row, col, color) => {
        const pos = numberPositions[number];
        return color === "#FFFF00" && row === pos.row - 1 && col === pos.col;
    };
}

function checkBelowBlack(row, col, color) {
    return color === "#800080" && row === blackPosition.row + 1 && col === blackPosition.col;
}

function checkFourthRowEighthCol(row, col, text) {
    return text && row === 3 && col === 7;
}

function checkAboveMultiplication(row, col, color) {
    return color === "#ADD8E6" && row === numberPositions[48].row - 1 && col === numberPositions[48].col;
}

function checkLeftOfNumber(number) {
    return (row, col, value) => {
        const pos = numberPositions[number];
        return value === "triangle" && row === pos.row && col === pos.col - 1;
    };
}

function checkSecondRowSecondCol(row, col, text) {
    return (text === "G" || text === "g") && row === 1 && col === 1;
}

let isPaused = false; // Variable para controlar si el juego está pausado
let pauseTime = 0;    // Tiempo acumulado cuando se pausa

// Función para pausar y reanudar el tiempo
function togglePause() {
    const notificationElement = document.getElementById("notification");
    const pauseButton = document.querySelector(".pausar span");

    if (!isPaused) {
        // Pausar el temporizador
        isPaused = true;
        pauseTime = Date.now();
        cancelAnimationFrame(timerRequest);

        // Guardar el estado actual en localStorage
        localStorage.setItem("pauseState", JSON.stringify({
            startTime: startTime,
            incorrectAttempts: incorrectAttempts,
            completedInstructions: completedInstructions
        }));
        console.log("Estado guardado en pausa:", localStorage.getItem("pauseState"));

        notificationElement.textContent = "¡Tranquilo/a! Tómate tu tiempo.";
        pauseButton.textContent = "Reanudar";
    } else {
        // Reanudar el temporizador
        isPaused = false;
        const pausedDuration = Date.now() - pauseTime;
        startTime += pausedDuration;

        // Recuperar el estado guardado
        const pauseState = JSON.parse(localStorage.getItem("pauseState"));
        if (pauseState) {
            incorrectAttempts = pauseState.incorrectAttempts;
            completedInstructions = pauseState.completedInstructions;
        }

        updateTimer();
        notificationElement.textContent = "";
        pauseButton.textContent = "Pausar";
    }
}


// Temporizador
function startTimer() {
    startTime = Date.now();
    updateTimer();
}

function updateTimer() {
    if (isPaused) return; // No hacer nada si el temporizador está pausado

    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    timerRequest = requestAnimationFrame(updateTimer);
}

// Botón "Finalizar" guarda tiempo e intentos y redirige a estadistica.php
document.querySelector('#finalizar').addEventListener("click", () => {
    stopGameAndSaveStats();
});

function stopGameAndSaveStats() {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    // Recuperar o validar los datos del paciente
    let pacienteId = localStorage.getItem("pacienteId");
    if (!pacienteId) {
        alert("Error: No se encuentra el ID del paciente. Por favor, reinicia el juego.");
        return;
    }

    // Guardar tiempo e intentos en localStorage
    localStorage.setItem("finalTime", `${minutes}:${seconds.toString().padStart(2, "0")}`);
    localStorage.setItem("incorrectAttempts", incorrectAttempts);

    console.log("Datos guardados antes de finalizar:", {
        finalTime: localStorage.getItem("finalTime"),
        incorrectAttempts: localStorage.getItem("incorrectAttempts"),
        pacienteId: pacienteId
    });

    // Redirigir a estadistica.php
    window.location.href = "../php/estadistica.php";
}