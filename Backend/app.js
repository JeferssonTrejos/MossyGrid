// server.js
const express = require('express');
const cors = require('cors'); // Vital para que Vue (puerto 5173) hable con Node (puerto 3000)
const { getBestMove } = require('./bot'); // Importas el archivo con tu algoritmo Minimax

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde tu frontend en Vite
app.use(express.json()); // Permite que el servidor entienda el JSON que envías en el body

// Ruta para el movimiento del Bot
app.post('/api/bot-move', (req, res) => {
    try {
        const { board, botSymbol, playerSymbol } = req.body;

        // Validación de datos recibidos del frontend
        if (!board || !botSymbol || !playerSymbol) {
            return res.status(400).json({ error: "Datos incompletos para procesar el movimiento." });
        }

        // Llamada a tu función de Minimax
        const move = getBestMove(board, botSymbol, playerSymbol);

        // Respuesta en formato JSON puro para evitar el error "Unexpected token ☀️"
        res.json({ move: move });
        
    } catch (error) {
        console.error("Error en la lógica del bot:", error);
        res.status(500).json({ error: "Error interno en el servidor del bot." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Mossy Grid corriendo en http://localhost:${PORT}`);
});