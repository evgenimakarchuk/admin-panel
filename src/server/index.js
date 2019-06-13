const fs = require('fs');
const faker = require('faker');
const users = require('./users.json');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

var express = require('express');
var app = express();
const writeUsers = users => fs.writeFileSync(
    __dirname + '/users.json',
    JSON.stringify(users),
    { encoding: 'utf8' }
);

app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
app.get('/users', (req, res) => {
    const {
        limit = 10,
        offset = 0,
    } = req.query || {};
    
    const items = users.slice(+offset, +(offset) + (+limit));
    res.send({
        items,
        total: users.length,
    });

});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).end();
    }
    const user = users.find(el => el.id === id);
    if (!user) {
        return res.status(400).end();
    }
    res.json(user);
});
app.post('/users/create', (req, res) => {
    if (!req.body.name) {
        return res.status(400).end();
    }
    const user = { ...req.body, id: faker.random.uuid(), };
    const usersCol = [...users, user];
    writeUsers(usersCol);
    const { username } = req.body;
    const token = jwt.sign({ username }, 'secret');
    res.json({ token, user: req.body });
});
app.post('/users/edit/:id', (req, res) => {
    const { id } = req.params;
    if (!id || !req.body.name) {
        return res.status(400).end();
    }
    const usersCol = users.reduce((acc, el) => el.id === id ? [...acc, req.body] : [...acc, el], []);
    writeUsers(usersCol);
    res.status(200).end();
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).end();
    }
    const user = users.find(user => username === user.username);
    if (!user) {
        return res.status(403).end();
    }
    if (user.password && (user.password !== password)) {
        return res.status(403).end();
    }
    const token = jwt.sign({ username }, 'secret');
    res.send({ token, user });
})

app.listen(8080, function () {
    console.log(`Example app listening on port ${8080}!`);
});
