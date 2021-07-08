const mongoose = require('mongoose');
const { Tummy } = require('../models/photoshoot');

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

const tummyPshoots = [
    {
        title: 'Sesja Alka i Natana',
        image: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621372113/KarolinaPhoto/vr8wdqaxoooba3fcjgn0.jpg',
        description: 'sesja na lotnisku',
        owner: '609b85e05603612ee1d276ff'
    },
    {
        title: 'Sesja Majki i Kajki',
        image: 'https://res.cloudinary.com/dqcadja0y/image/upload/v1621372113/KarolinaPhoto/vr8wdqaxoooba3fcjgn0.jpg',
        description: 'sesja indiańska',
        owner: '609b85e05603612ee1d276ff'
    },
]

Tummy.insertMany(tummyPshoots)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

