const mongoose = require('mongoose');
const { Kids } = require('../models/photoshoot');

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

const kidsPshoots = [
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

Kids.insertMany(kidsPshoots)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

// const s = new Photoshoot({
//     name: "Sesja Alka",
//     description: "Pierwsza sesyjka Alusia"
// })

// s.save().then(p => {
//     console.log(p)
// })

//     .catch(e => {
//         console.log(e)
//     })

// const shootDB = async () => {
//     await Photoshoot.deleteMany({});
//     const shoot = new Photoshoot({
//         title: 'sesja Alka',
//         description: 'moja pierwsza sesja'
//     });
//     await shoot.save();
// }

// shootDB().then(() => {
//     mongoose.connection.close();
// })
