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
let starPosition = null; // Guardará la posición de la estrella
let blackPosition = null; // Guardará la posición de la casilla negra
let incorrectAttempts = 0; // Variable para contar intentos incorrectos

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
            !isValidPosition(element, row, col) // Verifica las reglas específicas
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
    // Restricciones para cada elemento
    if (element.type === 'star') {
        if (row === 0) return false; // No puede estar en la primera fila
        if (initialElementsPositions.has((row - 1) * cols + col)) return false; // No puede tener un elemento aleatorio arriba
    }

    if (element.type === 'black') {
        if (row === 0 || row === rows - 1) return false; // No puede estar en la primera ni última fila
        if (initialElementsPositions.has((row - 1) * cols + col) || initialElementsPositions.has((row + 1) * cols + col)) return false; // No puede tener elementos arriba ni abajo
    }

    if (element.type === 'number') {
        if (element.value === 15 && col < cols - 1 && initialElementsPositions.has(row * cols + col + 1)) return false; // No puede haber elemento a la derecha
        if (element.value === 50 && ((col > 0 && initialElementsPositions.has(row * cols + col - 1)) || (col < cols - 1 && initialElementsPositions.has(row * cols + col + 1)))) return false; // No puede haber elementos a los lados
        if (element.value === 21 && row > 0 && initialElementsPositions.has((row - 1) * cols + col)) return false; // No puede haber elemento encima
        if (element.value === 48 && (row === 0 || col === 0 || initialElementsPositions.has((row - 1) * cols + col) || initialElementsPositions.has(row * cols + col - 1))) return false; // No en primera fila o columna, ni tener elementos a la izquierda ni arriba
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
        checkStarCondition(row, col, selectedColor);
    } else if (selectedLetter) {
        writeOnCell(row, col, selectedLetter);
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

function checkStarCondition(row, col, color) {
    if (starPosition && row === starPosition.row - 1 && col === starPosition.col) {
        if (color === "#FF0000") {
            document.getElementById("notification").innerText = "¡Correcto!";
        } else {
            incorrectAttempts++;
            document.getElementById("notification").innerText = "Incorrecto.";
            document.getElementById("attemptCounter").innerText = `Intentos incorrectos: ${incorrectAttempts}`;
        }
    }
}
