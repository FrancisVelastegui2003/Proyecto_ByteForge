document.addEventListener("DOMContentLoaded", function() {
    drawBoard();
});

const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const cellSize = 50;
const rows = 5;
const cols = 10;
let selectedColor = "";
let selectedLetter = "";
let drawTriangleMode = false;

const initialElementsPositions = new Set(); // Guardará las posiciones iniciales
let starPosition = null; // Posición de la estrella
let blackPosition = null; // Posición de la casilla negra
let incorrectAttempts = 0; // Contador de intentos incorrectos

function setColor(color) {
    selectedColor = color;
    selectedLetter = "";
    drawTriangleMode = false;
}

function clearColor() {
    selectedColor = "clear";
    selectedLetter = "";
    drawTriangleMode = false;
}

function writeLetter(letter) {
    selectedLetter = letter;
    selectedColor = "";
    drawTriangleMode = false;
}

function drawTriangle() {
    drawTriangleMode = true;
    selectedLetter = "";
    selectedColor = "";
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const elements = [
        { type: 'number', value: 15 },
        { type: 'number', value: 50 },
        { type: 'number', value: 21 },
        { type: 'number', value: 48 },
        { type: 'star' },
        { type: 'black' }
    ];

    const usedPositions = new Set();

    elements.forEach(element => {
        let position;
        let row, col;

        do {
            position = Math.floor(Math.random() * rows * cols);
            row = Math.floor(position / cols);
            col = position % cols;
        } while (
            usedPositions.has(position) ||
            !isValidPosition(element, row, col)
        );

        usedPositions.add(position);
        initialElementsPositions.add(position);

        if (element.type === 'star') starPosition = { row, col };
        if (element.type === 'black') blackPosition = { row, col };

        drawElement(row, col, element);
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

function isValidPosition(element, row, col) {
    if (element.type === 'star') {
        if (row === 0) return false;
    }
    if (element.type === 'black') {
        if (row === 0 || row === rows - 1) return false;
    }
    return true;
}

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
        ctx.fillStyle = "black";
        ctx.fillRect(x, y, cellSize, cellSize);
    }
}

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
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (drawTriangleMode) {
        drawTriangleInCell(row, col);
    } else if (selectedColor === "clear") {
        clearCell(row, col);
    } else if (selectedColor) {
        colorCell(row, col, selectedColor);
        checkConditions(row, col, selectedColor);
    } else if (selectedLetter) {
        writeOnCell(row, col, selectedLetter);
        checkConditions(row, col, selectedLetter);
    }
});

function colorCell(row, col, color) {
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
}

function writeOnCell(row, col, letter) {
    const x = col * cellSize + cellSize / 3;
    const y = row * cellSize + cellSize / 1.5;
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(letter, x, y);
}

function clearCell(row, col) {
    const position = row * cols + col;
    if (initialElementsPositions.has(position)) {
        return;
    }
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.clearRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
}

function drawTriangleInCell(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    const triangleSize = cellSize / 2;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 2, y + cellSize / 4);
    ctx.lineTo(x + cellSize / 4, y + 3 * cellSize / 4);
    ctx.lineTo(x + 3 * cellSize / 4, y + 3 * cellSize / 4);
    ctx.closePath();
    ctx.fill();
}

// Función para actualizar el contador de intentos incorrectos
function updateAttemptCounter() {
    incorrectAttempts++;
    document.getElementById("attemptCounter").textContent = `Intentos incorrectos: ${incorrectAttempts}`;
}

// Función para manejar el clic en el tablero
document.getElementById("tablero").addEventListener("click", function (event) {
    const row = Math.floor(event.offsetY / 50); // Ajusta según tamaño de celda
    const col = Math.floor(event.offsetX / 50); // Ajusta según tamaño de celda
    let action = null;

    if (currentColor) {
        action = currentColor;
    } else if (currentLetter) {
        action = currentLetter;
    } else if (drawTriangleMode) {
        action = "triangle";
    }

    if (action) {
        checkConditions(row, col, action);
    }
});

function checkConditions(row, col, action) {
    // Instrucción 1: Casilla encima de la estrella debe estar coloreada de rojo
    if (starPosition && row === starPosition.row - 1 && col === starPosition.col && action === "#FF0000") {
        document.getElementById("instruction-1").style.color = "green";
    }

    // Instrucción 2: Casilla a la derecha del número 15 debe estar coloreada de café
    if (row === starPosition.row && col === starPosition.col + 1 && action === "#8B4513") {
        document.getElementById("instruction-2").style.color = "green";
    }

    // Instrucción 3: Escribe la primera letra de tu nombre encima de la casilla negra
    if (blackPosition && row === blackPosition.row - 1 && col === blackPosition.col && action === "S") {
        document.getElementById("instruction-3").style.color = "green";
    }

    // Instrucción 4: Casilla con suma 50 coloreada verde
    if ((row === 1 && col === 1 || row === 3 && col === 3) && action === "#008000") {
        document.getElementById("instruction-4").style.color = "green";
    }

    // Instrucción 5: Colorea la primera fila y cuarta columna de rosado
    if (row === 0 && col === 3 && action === "#FFC0CB") {
        document.getElementById("instruction-5").style.color = "green";
    }

    // Instrucción 6: Casilla encima de 21 amarillo y debajo negra
    if ((row === 2 && col === 1 && action === "#FFFF00") || (row === 4 && col === 1 && action === "#000000")) {
        document.getElementById("instruction-6").style.color = "green";
    }

    // Instrucción 7: Colorea de morado debajo de la negra
    if (blackPosition && row === blackPosition.row + 1 && col === blackPosition.col && action === "#800080") {
        document.getElementById("instruction-7").style.color = "green";
    }

    // Instrucción 8: Escribe el número de hijos en la cuarta fila y octava columna
    if (row === 3 && col === 7 && action === "2") { // Supongamos que 2 hijos
        document.getElementById("instruction-8").style.color = "green";
    }

    // Instrucción 9: Colorea de celeste encima de 48
    if (row === 0 && col === 4 && action === "#ADD8E6") {
        document.getElementById("instruction-9").style.color = "green";
    }

    // Instrucción 10: Dibuja un triángulo en la izquierda de 48
    if (row === 1 && col === 3 && drawTriangleMode) {
        document.getElementById("instruction-10").style.color = "green";
    }

    // Instrucción 11: Séptima letra del abecedario en segunda fila y segunda columna
    if (row === 1 && col === 1 && action === "G") {
        document.getElementById("instruction-11").style.color = "green";
    }
}
