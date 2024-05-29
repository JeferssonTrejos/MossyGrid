const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors())
app.use('/', express.static('public'))

app.get('/ping', (req, res) => {
    res.send({ ping: 'pong' })
})

// Connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('App running in http://localhost:' + PORT)
})
