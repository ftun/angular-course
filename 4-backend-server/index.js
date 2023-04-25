require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const PORT = process.env.PORT;
const app = express();
// confifuracion de cors
app.use(cors());
// lectura y parse del body en los request
app.use(express.json())

dbConnection();

// console.log(process.env)

app.get('/', (req, res) => {
    res.json({ msn: 'Hey!'});
});

app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/searchs', require('./routes/searchs'));


app.listen(PORT, () => {
    console.log('Server running in port: ', PORT)
})