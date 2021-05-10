const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Kids } = require('./models/photoshoot');
const { Family } = require('./models/photoshoot');
const morgan = require('morgan');
const kids = require('./routes/kids');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const Joi = require('joi');
const { kidsSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const { urlencoded } = require('express');
const { fileLoader } = require('ejs');
const photoshoot = require('./models/photoshoot');
const { error } = require('console');

mongoose.connect('mongodb://localhost:27017/karolina-photo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("KP Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 *24 * 7,
        maxAge: 1000 * 60 * 60 *24 * 7
    }
}
app.use(session(sessionConfig))
app.use(morgan('tiny'));
app.use('/kids', kids)

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


// family photoshoots


// app.get('/family', async (req, res) => {
//     const families = await Family.find({});
//     res.render('ps-family/index', { families, style: 'app' });
// });

// app.get('/family/new', (req, res) => {
//     res.render('family', { style: 'app' });
// });

// app.get('/family/:id', async (req, res) => {
//     const { id } = req.params;
//     const families = await Family.findById(id)
//     res.render('./pshoots/show', { families, style: 'app' })
// });



app.all('*', (req, res, next) => {
    next(new ExpressError('Page NOt Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'coś nie zadziałało' } = err;
    if (!err.message) err.message = "Coś się nie udało"
    res.status(statusCode).render('error', { err, style: 'app' })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});

