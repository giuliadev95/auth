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
    console.log(users);
}); 

// post users
app.post('/users', async (req, res)=> {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
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
});

app.post('/users/login', async(req, res)=> {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try{
      if( await bcrypt.compare(req.body.password, user.password)){
        res.send('Success')
      } else {
        res.status(500).send('Not allowed');
      }
    }
    catch(error){
        res.status(500).send(error);
    }
})