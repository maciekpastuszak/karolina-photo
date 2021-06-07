if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Kid } = require('./models/photoshoot');
const { Family } = require('./models/photoshoot');
const morgan = require('morgan');
const kidsRoutes = require('./routes/kids');
const familyRoutes = require('./routes/family');
const usersRoutes = require('./routes/users');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const Joi = require('joi');
// const { kidsSchema } = require('./schemas.js')
// const { familySchema } = require('./schemas.js')
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
const MongoStore = require('connect-mongo');

// connect to db
// const dbUrl = 'mongodb://pastuszak_photo:YF7aJcXkZSBCD8yFwh8wus2vEA9rXuqf@mongodb.pastuszak.nazwa.pl:4005/pastuszak_photo';
const dbUrl = 'mongodb://localhost:27017/karolina-photo';
mongoose.connect(dbUrl, { 
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

app.engine('ejs', ejsMate)	
app.set('view engine', 'ejs');	
app.set('views', path.join(__dirname, 'views'))	
app.use(express.urlencoded({ extended: true }));	
app.use(methodOverride('_method'));	
app.use(express.static(path.join(__dirname, 'public')))	
app.use(mongoSanitize({	
    replaceWith: '_'	
}))	
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
});

//set up session
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie : {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet({contentSecurityPolicy: false}));

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

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


app.use(morgan('tiny'));
app.use('/', usersRoutes)
app.use('/kids', kidsRoutes)
app.use('/family', familyRoutes)

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


app.all('*', (req, res, next) => {
    next(new ExpressError('Ups, nie ma takiej strony. Spróbuj ponownie', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Coś się nie udało"
    res.status(statusCode).render('error', { err, style: 'app' })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
