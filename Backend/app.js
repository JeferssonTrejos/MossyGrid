const express = require('express');
const cors = require('cors');
const { getBestMove } = require('./logic/bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

app.post('/api/bot-move', (req, res) => {
    const { board, botSymbol, playerSymbol } = req.body;

    if (!board || !botSymbol || !playerSymbol) {
        return res.status(400).json({ error: "Faltan datos en la petición" });
    }

    const move = getBestMove(board, botSymbol, playerSymbol);

    setTimeout(() => {
        res.json({ move });
    }, 600);
});

app.listen(PORT, () => {
    console.log(`Servidor de Mossy Grid corriendo en http://localhost:${PORT}`);
});