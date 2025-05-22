const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log('Listening on port ', PORT, ' at: http://localhost:3000');
}) 

// Homepage
app.get('/', (req, res) => {
    console.log(`Example app listening on port ${PORT}`);
    res.send(`Example app listening on port ${PORT}`);
});

// Initialize constant users
const users = [];

// get users
app.get('/users', (req, res) => {
    console.log(`Example app listening on port ${PORT}/users`);
    res.send(users);
}); 

// post users
app.post('/users', (req, res)=> {
    const user = {
        name: req.body.name,
        password: req.body.password
    }
    users.push(user);
    res.status(201).send();
})