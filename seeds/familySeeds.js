const mongoose = require('mongoose');
const { Family } = require('../models/photoshoot');

mongoose.connect('mongodb://localhost:27017/karolina-photo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("karolina-photo database connected");
});

const familyPshoots = [
    {
        title: 'Sesja rodziny Kiepski',
        description: 'sesja w studiu'
    },
    {
        title: 'Sesja rodziny Pastuszak',
        description: 'sesja w studiu'
    },
    {
        title: 'Sesja rodziny Frankenstein',
        description: 'ssesja w studiu'
    },
    {
        title: 'Sesja rodziny Klaput',
        description: 'sesja w studiu'
    },
    {
        title: 'Sesja rodziny Kennedych',
        description: 'sesja w studiu'
    },
    {
        title: 'Sesja rodzny Kowalskich',
        description: 'sesja w studiu'
    },
]

Family.insertMany(familyPshoots)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
