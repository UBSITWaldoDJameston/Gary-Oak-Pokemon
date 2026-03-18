require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected Successfully'))
    .catch(err => console.error('Connection Error:', err));

const Pokemon = mongoose.model('pokemon', new mongoose.Schema({
    name: String,
    type: String,
    level: Number,
    nature: String
}));

app.get('/api/pokemon', async (req, res) => {
    try {
        const team = await Pokemon.find();
        res.json(team);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/api/pokemon', async (req, res) => {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.send(pokemon);
});

app.listen(3000, () => { console.log('API running on http://localhost:3000') });
