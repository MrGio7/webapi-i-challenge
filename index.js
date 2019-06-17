const express = require('express');
const db = require('./data/db');

const server = express();

server.use(express.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({errorMassage: message});
    return
};

server.get('/', (req, res) => {
    res.send('<h2>Server Up</h2>')
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(allUsers => {
        res.json(allUsers)
    })
    .catch( error => {
        sendUserError(500, "data cant be retrieved", res);
        return;
    })
});

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
    db.findById(id)
    .then(user => {
        if(user.length === 0) {
            sendUserError(404, 'user with that id not found', res);
            return;
        }
        res.json(user)
    })
    .catch(error => {
        sendUserError(500, 'error looking up user', res);
    })
})



server.listen(9090, () => {
    console.log('listening port 9090')
})