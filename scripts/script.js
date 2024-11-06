const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const cellSize = 50;
const rows = 5;
const cols = 10;
let selectedColor = "";
let selectedLetter = "";
let drawTriangleMode = false; // Variable para activar el modo de dibujo de triángulo

// Función para establecer el color seleccionado
function setColor(color) {
    selectedColor = color;
    selectedLetter = "";
    drawTriangleMode = false; // Desactivar modo de triángulo
}

// Función para limpiar el color seleccionado
function clearColor() {
    selectedColor = "clear";
    selectedLetter = "";
    drawTriangleMode = false; // Desactivar modo de triángulo
}

// Función para seleccionar una letra específica
function writeLetter(letter) {
    selectedLetter = letter;
    selectedColor = "";
    drawTriangleMode = false; // Desactivar modo de triángulo
}

// Activar el modo de dibujo de triángulo
function drawTriangle() {
    drawTriangleMode = true;
    selectedLetter = "";
    selectedColor = "";
}

// Función para dibujar el tablero y elementos aleatorios
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
        do {
            position = Math.floor(Math.random() * rows * cols);
        } while (usedPositions.has(position));
        usedPositions.add(position);

        const row = Math.floor(position / cols);
        const col = position % cols;
        drawElement(row, col, element);
    });

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

// Función para dibujar un elemento en una celda específica
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

// Función para dibujar una estrella
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

// Evento de clic en el canvas
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (drawTriangleMode) {
        drawTriangleInCell(row, col); // Dibuja un triángulo en la celda seleccionada
    } else if (selectedColor === "clear") {
        clearCell(row, col);
    } else if (selectedColor) {
        colorCell(row, col, selectedColor);
    } else if (selectedLetter) {
        writeOnCell(row, col, selectedLetter);
    }
});

// Función para colorear una celda específica
function colorCell(row, col, color) {
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
}

// Función para escribir en una celda específica
function writeOnCell(row, col, letter) {
    const x = col * cellSize + cellSize / 3;
    const y = row * cellSize + cellSize / 1.5;
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(letter, x, y);
}

// Función para borrar una celda específica
function clearCell(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    ctx.clearRect(x, y, cellSize, cellSize);
    ctx.strokeRect(x, y, cellSize, cellSize);
}

// Función para dibujar un triángulo en una celda específica
function drawTriangleInCell(row, col) {
    const x = col * cellSize;
    const y = row * cellSize;
    const triangleSize = cellSize / 2;

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x + cellSize / 2, y + cellSize / 4); // Vértice superior
    ctx.lineTo(x + cellSize / 4, y + 3 * cellSize / 4); // Vértice inferior izquierdo
    ctx.lineTo(x + 3 * cellSize / 4, y + 3 * cellSize / 4); // Vértice inferior derecho
    ctx.closePath();
    ctx.fill();
}

// Inicializa el tablero
drawBoard();
