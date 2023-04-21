require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

dbConnection();

// console.log(process.env)

app.get('/', (req, res) => {
    res.json({ msn: 'Hey!'})
});

app.listen(PORT, () => {
    console.log('Server running in port: ', PORT)
})