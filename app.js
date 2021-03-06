if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const kidsRoutes = require('./routes/kids');
const familyRoutes = require('./routes/family');
const tummyRoutes = require('./routes/tummy');
const newbornRoutes = require('./routes/newborn');
const communionRoutes = require('./routes/communion');
const usersRoutes = require('./routes/users');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const favicon = require('serve-favicon');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const helmet = require('helmet');
const nonce = require('./utils/nonce');
const mongoSanitize = require('express-mongo-sanitize');

const MongoStore = require('connect-mongo');

// connect to db
const dbUrl = process.env.DB_URL1
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
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use('/', usersRoutes);
app.use('/sesja-dziecieca', kidsRoutes);
app.use('/sesja-rodzinna', familyRoutes);
app.use('/sesja-brzuszkowa', tummyRoutes);
app.use('/sesja-noworodkowa', newbornRoutes);
app.use('/sesja-komunijna', communionRoutes);

app.get('/', (req, res) => {
    res.render('index', { style: 'app', 
                          title: "Karolina Pastuszak Photography", 
                          metaDescription: "Fotograf z Bielska-Bia??ej - Zapraszam na sesje zdj??ciowe: noworodkowe, ci????owe, rodzinne, komunijne, ??lubne, sesje studyjne i w plenerze", 
                          metaKeywords:"fotograf bielsko, sesja ci????owa, sesja brzuszkowa, sesja noworodkowa, fotografia ??lubna, zdj??cia ??lubne, fotografia bielsko, sesja ci????owa w plenerze, sesja niemowl??ca, fotograf na wesele",
                          canonicalTag:"https://karolinapastuszak.pl",
                          nonce: nonce });
});

app.get('/studio', (req, res) => {
    res.render('studio', { style: 'studio',
                           title: "Sesja studyjna, sesja w plenerze | Fotograf Bielsko",
                           metaDescription: "Zapraszam na sesj?? studyjn?? oraz sesj?? w plenerze - noworodkow??, ci????ow??, kobiec??, rodzinn??, dzieci??c??.",
                           metaKeywords:"ffotograf bielsko, fotografia bielsko, fotograf bielsko-bia??a, fotografia dzieci??ca, sesja komunijna, sesja noworodkowa, sesja rodzinna, sesja ci????owa, sesja studyjna, sesja w plenerze, sesja zdj??ciowa, sesja ci????owa bielsko, sesja noworodkowa bielsko, sesja kobieca bielsko",
                           canonicalTag:"https://karolinapastuszak.pl/studio",
                           nonce: nonce });
});

app.get('/przed-sesja', (req, res) => {
    res.render('przed-sesja', { style: 'beforePS',
                               title: "Sesja zdj??ciowa - jak si?? przygotow??? | Fotograf Bielsko",
                               metaDescription: "O czym warto pami??ta?? przed sesj?? zdj??ciow?? noworodkow?? lub rodzinn??? Jak si?? przygotowa?? do sesji ci????owej?",
                               metaKeywords:"fotograf bielsko, fotografia bielsko, fotograf bielsko-bia??a, fotografia dzieci??ca, sesja komunijna, sesja noworodkowa, sesja rodzinna, sesja ci????owa, sesja studyjna, sesja w plenerze, sesja zdj??ciowa", 
                               canonicalTag:"https://karolinapastuszak.pl/przed-sesja",
                               nonce: nonce});
});

app.get('/voucher', (req, res) => {
    res.render('voucher', { style: 'voucher',
                            title: "Voucher - sesja zdj??ciowa na prezent | Fotograf Bielsko",
                            metaDescription: "Bon podarunkowy na sesj?? zdj??ciow?? to wyj??tkowy pomys?? na prezent z okazji narodzin dziecka, urodzin, rocznicy ??luby.",
                            metaKeywords: "fotograf bielsko, fotografia bielsko, voucher, voucher podarunkowy, bon podarunkowy, voucher na sesj?? fotograficzn??, fotograf bielsko-bia??a, fotografia dzieci??ca, sesja komunijna, sesja noworodkowa, sesja rodzinna, sesja ci????owa, sesja studyjna, sesja w plenerze, sesja zdj??ciowa",
                            canonicalTag:"https://karolinapastuszak.pl/voucher",
                            nonce: nonce });
});

app.get('/cennik', (req, res) => {
    res.render('cennik', { style: 'pricing',
                           title: "Ile kosztuje sesja zdj??ciowa? Cennik | Fotograf Bielsko",
                           metaDescription: "Ile kosztuje sesja zdj??ciowa noworodkowa, ci????owa, dzieci??ca, rodzinna, kobieca? Od czego zale??y cena? Zapraszam do zapoznania si?? z pakietami!",
                           metaKeywords: "fotograf bielsko, cennik sesji zdj??ciowej, fotografia bielsko, fotograf bielsko-bia??a,ile kosztuje sesja zdj??ciowa, koszt sesji zdj??ciowej, cena sesji zdj??ciowej, fotografia dzieci??ca, sesja komunijna, sesja noworodkowa, sesja rodzinna, sesja ci????owa, sesja studyjna, sesja w plenerze, sesja zdj??ciowa, sesja ci????owa bielsko, sesja noworodkowa bielsko, sesja kobieca bielsko",
                           canonicalTag:"https://karolinapastuszak.pl/cennik",
                           nonce: nonce });
});

app.get('/kontakt', (req, res) => {
    res.render('kontakt', { style: 'contact',
                            title: "Kontakt - Karolina Pastuszak Photography | Fotograf Bielsko",
                            metaDescription: "Moje studio zlokalizowane jest w zabytkowej Kamienicy pod Or??em w Bielsku-Bia??ej. Studio jest profesjonalnie wyposa??one i przystosowane do r????nego rodzaju sesji ??? noworodkowych, ci????owych, kobiecych, rodzinnych, wizerunkowych.",
                            metaKeywords: "fotograf bielsko, fotografia bielsko, fotograf bielsko-bia??a, fotografia dzieci??ca, sesja komunijna, sesja noworodkowa, sesja rodzinna, sesja ci????owa, sesja studyjna, sesja w plenerze, sesja zdj??ciowa",
                            canonicalTag:"https://karolinapastuszak.pl/kontakt",
                            nonce: nonce});
});

app.get('/sitemap.xml', (req, res) => {
    res.sendFile('sitemap.xml', { root: '.' });
    });

app.get('/robots.txt', (req, res) => {
        res.sendFile('robots.txt', { root: '.' });
        });

// app.get('/robots.txt', function (req, res) {
//     res.type('text/plain');
//     res.send("User-agent: *\nAllow: /");
// });

app.all('*', (req, res, next) => {
    next(new ExpressError('Ups, nie ma takiej strony. Spr??buj ponownie', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Co?? si?? nie uda??o"
    res.status(statusCode).render('error', { err, style: 'app', title: "Error", metaDescription:"error", metaKeywords: "", nonce: nonce })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
