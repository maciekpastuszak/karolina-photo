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
        title: 'Sesja Alka i Natana',
        image: 'https://source.unsplash.com/collection/73601861',
        description: 'sesja na lotnisku'
    },
    {
        title: 'Sesja Majki i Kajki',
        image: 'https://source.unsplash.com/collection/73601861',
        description: 'sesja indiańska'
    },
    {
        title: 'Sesja Adama i Ewy',
        image: 'https://source.unsplash.com/collection/73601861',
        description: 'sesja w ogrodzie'
    },
    {
        title: 'Sesja Tosi i Tymka',
        image: 'https://source.unsplash.com/collection/73601861',
        description: 'sesja na huśtawkach'
    },
    {
        title: 'Sesja Kasi i Tomka',
        image: 'https://source.unsplash.com/collection/73601861',
        description: 'sesja małżeńska'
    },
]

Family.insertMany(familyPshoots)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
