const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Photoshoot = require('./models/photoshoot');

mongoose.connect('mongodb://localhost:27017/karolina-photo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("KP Database connected");
});

const app = express();
const ejsMate = require('ejs-mate');
const { urlencoded } = require('express');
const { fileLoader } = require('ejs');
const photoshoot = require('./models/photoshoot');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home', { style: 'app' });
});

app.get('/aboutMe', (req, res) => {
    res.render('aboutMe', { style: 'aboutMe' });
});

app.get('/beforePS', (req, res) => {
    res.render('beforePS', { style: 'beforePS' });
});

app.get('/voucher', (req, res) => {
    res.render('voucher', { style: 'voucher' });
});

app.get('/pricing', (req, res) => {
    res.render('pricing', { style: 'pricing' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { style: 'contact' });
});

app.get('/kids', async (req, res) => {
    const kids = await Photoshoot.find({});
    res.render('./pshoots/kids', { kids });
});

app.get('/kids/new', (req, res) => {
    res.render('./pshoots/new');
});

app.post('/kids', async (req, res) => {
    const kids = await Photoshoot(req.body.kids);
    await kids.save();
    res.redirect(`./${kids._id}`)

})

app.get('/kids/:id', async (req, res) => {
    // const { id } = req.params;
    const kids = await Photoshoot.findById(req.params.id)
    res.render('./pshoots/show', { kids })
});

app.get('/kids/:id/edit', async (req, res) => {
    const kids = await Photoshoot.findById(req.params.id)
    res.render('./pshoots/edit', { kids })
});

app.put('/kids/:id', async (req, res) => {
    const { id } = req.params;
    const kids = await Photoshoot.findByIdAndUpdate(id, { ...req.body.kids })
    res.redirect(`./${kids._id}`)
})

app.delete('/kids/:id', async (req, res) => {
    const { id } = req.params;
    await Photoshoot.findByIdAndDelete(id);
    res.redirect('./')
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});

