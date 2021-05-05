const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const { Kids } = require('./models/photoshoot');
const { Family } = require('./models/photoshoot');
const morgan = require('morgan')

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
const Joi = require('joi')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const { urlencoded } = require('express');
const { fileLoader } = require('ejs');
const photoshoot = require('./models/photoshoot');
const { error } = require('console');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

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

// kids photoshoots

app.get('/kids', catchAsync(async (req, res) => {
    const kids = await Kids.find({});
    res.render('ps-kids/index', { kids, style: 'app' });
}));

app.get('/kids/new', (req, res) => {
    res.render('ps-kids/new', { style: 'app' });
});

app.post('/kids', catchAsync(async (req, res) => {
    // if (!req.body.kids) throw new ExpressError("Nie ma takiej sesji", 400)
    const kidsSchema = Joi.object({
        kids: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required()
        }).required()
    })
    const { error } = kidsSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    console.log(result);
    const kids = new Kids(req.body.kids);
    await kids.save();
    res.redirect(`/kids/${kids._id}`)
}))

app.get('/kids/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id)
    res.render('ps-kids/show', { kids, style: 'app' })
}));

app.get('/kids/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findById(id)
    res.render('ps-kids/edit', { kids, style: 'app' })
}));


app.put('/kids/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const kids = await Kids.findByIdAndUpdate(id, { ...req.body.kids })
    res.redirect(`${kids._id}`)
}))

app.delete('/kids/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Kids.findByIdAndDelete(id);
    res.redirect('/kids')
}))


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

// app.use((req, res) => {
//     res.status(404).send('NIE ZNALEZIONO TAKIEJ STRONY')
// });

app.all('*', (req, res, next) => {
    next(new ExpressError('Page NOt Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'coś nie zadziałało' } = err;
    if (!err.message) err.message = "Coś się nie udało"
    res.status(statusCode).render('../error', { err, style: 'app' })
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});

