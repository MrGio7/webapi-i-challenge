const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>Server Up</h2>')
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
        res.send(allUsers)
    })
    .catch( ({code, message}) => {
        res.status(code).json({err: message})
    })
});



server.listen(9090, () => {
    console.log('listening port 9090')
})