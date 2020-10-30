const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialisation d'express
const app = express();

app.use(bodyParser.json());

// Sert a connecter notre base de donnée.
mongoose.connect('mongodb+srv://BaptSeg:Kil123lik@cluster0.mijlc.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Réglages qui permettent de communiquer avec le front
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// On intègre nos routes /stuff
const stuffRoutes = require('./routes/stuff');
app.use('/api/stuff', stuffRoutes);
// On intègre nos routes /user
const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes);

module.exports = app;