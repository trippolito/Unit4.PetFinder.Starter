// import the pets array from data.js
const pets = require('./data.js');
// https://expressjs.com/en/resources/middleware/cors.html
// installed cors so i could send data to the frontend
const cors = require('cors')

// init express app
const express = require('express');
const app = express();


const PORT = 8080;


app.use(express.static('PetFinder/dist'));
app.use(cors())

// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname + '/PetFinder/dist/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});


// practicing with params and query strings
app.get('/api/test/:name', (req, res) => {
    console.log(req.params?.name);
    console.log(req.query?.x);
    res.send('Hello World!');
});



// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // send the pets array as a response
    res.send(pets);
});



// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // get the owner from the request
    const owner = req.query?.owner;
    if (!owner) {
        res.status(400).send('Must provide owner as querry argument');
        return;
    }
    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner.toLowerCase() === owner.toLowerCase());
    console.log(pet);
    // send the pet as a response
    if (!pet) {
        res.status(400).send({ Error: 'Owner not found' });
    } else {
        res.send(pet);
    }

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // get the name from the request
    const name = req.params?.name;

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase());
    // send the pet as a response
    if (!pet) {
        res.send({});
    } else {
        res.send(pet);
    }
});


app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;