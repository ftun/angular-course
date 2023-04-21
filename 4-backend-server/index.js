const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
    res.json({ msn: 'Hey!'})
});

app.listen(PORT, () => {
    console.log('Server running in port: ', PORT)
})