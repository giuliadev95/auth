const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

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
app.post('/users', async (req, res)=> {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        console.log('Salt is: ', salt);
        console.log('The complete hashed password is: ', hashedPassword);
        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user);
        res.status(201).send();
    }
    catch(error){
        res.status(500).send(error);
        console.log('There was an error: ', error)
    }
    // hash(salt + 'password') // hashed password: same password block at the base, different salt on top
})