if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Kids } = require('./models/photoshoot');
const { Family } = require('./models/photoshoot');
const morgan = require('morgan');
const kidsRoutes = require('./routes/kids');
const usersRoutes = require('./routes/users');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const Joi = require('joi');
const { kidsSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const { urlencoded } = require('express');
const { fileLoader } = require('ejs');
const photoshoot = require('./models/photoshoot');
const { error } = require('console');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { contentSecurityPolicy } = require('helmet');



// connect to db
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

//set up app
const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(mongoSanitize());

//set up session
const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 *24 * 7,
        maxAge: 1000 * 60 * 60 *24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];

const styleSrcUrls = [
    "https://fonts.googleapis.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://fonts.gstatic.com",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/",
];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dqcadja0y/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use(morgan('tiny'));
app.use('/', usersRoutes)
app.use('/kids', kidsRoutes)

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
    next(new ExpressError('Ups, nie ma takiej strony. Spróbuj ponownie', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'coś nie zadziałało' } = err;
    if (!err.message) err.message = "Coś się nie udało"
    res.status(statusCode).render('error', { err, style: 'app' })
})

app.listen(3000, () => {
    console.log("NASŁUCHUJĘ NA PORCIE 3000")
});

