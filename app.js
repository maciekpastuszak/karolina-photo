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
const tummyRoutes = require('./routes/tummy');
const newbornRoutes = require('./routes/newborn')
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
const nonce = require('./utils/nonce');
const mongoSanitize = require('express-mongo-sanitize');
const { contentSecurityPolicy } = require('helmet');

const MongoStore = require('connect-mongo');

// connect to db
const dbUrl = process.env.DB_URL2
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
app.use(helmet());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://fonts.gstatic.com",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://ssl.google-analytics.com",
    "*.facebook.net",
    "https://static.hotjar.com",
    "https://script.hotjar.com"
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
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "www.facebook.com",
    "*.hotjar.com",
    "wss://*.hotjar.com",
    "*.hotjar.io"
];
const fontSrcUrls = [
    "https://fonts.gstatic.com",
    "https://fonts.googleapis.com/",
    "script.hotjar.com"
];
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'self'", `'nonce-${nonce}'`, ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            frameSrc: ["vars.hotjar.com"],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dqcadja0y/",
                "https://images.unsplash.com/",
                "https://www.google-analytics.com",
                "www.facebook.com",
                "script.hotjar.com"
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
app.use('/', usersRoutes);
app.use('/dzieci', kidsRoutes);
app.use('/rodzinne', familyRoutes);
app.use('/brzuszkowe', tummyRoutes);
app.use('/noworodki', newbornRoutes);

app.get('/', (req, res) => {
    res.render('index', { style: 'app', 
                          title: "Karolina Pastuszak Photography", 
                          metaDescription: "Fotograf z Bielska-Białej - Zapraszam na sesje zdjęciowe: noworodkowe, ciążowe, rodzinne, komunijne, ślubne, sesje studyjne i w plenerze", 
                          metaKeywords:"fotograf bielsko, sesja ciążowa, sesja brzuszkowa, sesja noworodkowa, fotografia ślubna, zdjęcia ślubne, fotografia bielsko, sesja ciążowa w plenerze, sesja niemowlęca, fotograf na wesele", nonce: nonce });
});

app.get('/studio', (req, res) => {
    res.render('studio', { style: 'studio',
                           title: "Studio fotograficzne",
                           metaDescription: "Moje studio fotograficzne, do którego zapraszam na profesjonalne sesje zdjęciowe. Zapraszam również na sesje plenerowe",
                           metaKeywords:"fotograf bielsko, studio fotograficzne, sesja świąteczna bielsko, sesja komunijna, sesja ciążowa w plenerze",
                           nonce: nonce });
});

app.get('/przed_sesja', (req, res) => {
    res.render('przedsesja', { style: 'beforePS',
                               title: "Jak przygotować się do sesji zdjęciowej",
                               metaDescription: "Kilka porad, jak przygotować się do sesji noworodkowej, sesji brzuszkowej, sesji rodzinnej i innych",
                               metaKeywords:"fotograf bielsko, przed sesją zdjęciową, sesja noworodkowa do kiedy, sesja zdjęciowa z makijażem i fryzurą bielsko, sesja ciążowa w studio, kiedy sesja ciążowa", 
                               nonce: nonce});
});

app.get('/voucher', (req, res) => {
    res.render('voucher', { style: 'voucher',
                            title: "Vouchery na sesje fotograficzne",
                            metaDescription: "Bon podarunkowy na sesję fotograficzną w Bielsku-Białej to wyjątkowy pomysł na prezent. Zapraszam do zakupu",
                            metaKeywords: "fotograf bielsko, voucher na sesję fotograficzną, kupon sesja fotograficzna, promocja sesja zdjęciowa",
                            nonce: nonce });
});

app.get('/cennik', (req, res) => {
    res.render('cennik', { style: 'pricing', title: "Cennik sesji fotograficznych", nonce: nonce });
});

app.get('/kontakt', (req, res) => {
    res.render('kontakt', { style: 'contact', title: "Dane kontaktowe Karolina Pastuszak Photography", nonce: nonce});
});


app.all('*', (req, res, next) => {
    next(new ExpressError('Ups, nie ma takiej strony. Spróbuj ponownie', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Coś się nie udało"
    res.status(statusCode).render('error', { err, style: 'app', title: "Error", nonce: nonce })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
