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
});

server.post('/api/users', (req, res) => {
    const newUser = req.body;
    db.insert(newUser)
    .then(addUser => {
        res.status(201).json(addUser)
    })
    .catch(error => {
        sendUserError(400, error, res);
        return;
    })
});

server.delete('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
    .then(removeUser => {
        res.json(removeUser)
    })
    .catch(error => {
        sendUserError(500, 'the user cant be removed', res);
        return
    })
});

server.put('/api/users/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updateUser => {
        if (updateUser) {
            res.json(updateUser)
        } else {
            sendUserError(404, 'incorrect id', res);
            return;
        }
    })
    .catch(error => {
        sendUserError(500, 'cant update user', res);
        return;
    })
})



server.listen(9090, () => {
    console.log('listening port 9090')
})