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
        description: 'sesja na lotnisku'
    },
    {
        title: 'Sesja Majki i Kajki',
        description: 'sesja indiańska'
    },
    {
        title: 'Sesja Adama i Ewy',
        description: 'sesja w ogrodzie'
    },
    {
        title: 'Sesja Tosi i Tymka',
        description: 'sesja na huśtawkach'
    },
    {
        title: 'Sesja Kasi i Tomka',
        description: 'sesja małżeńska'
    },
    {
        title: 'Sesja Maszy i Niedźwiedzia',
        description: 'sesja w ogordzie'
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
