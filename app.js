const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(express.static("node_modules/@fortawesome"));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/aboutMe', (req, res) => {
    res.render('aboutMe');
})

app.get('/beforePhotoShoot', (req, res) => {
    res.render('beforePhotoShoot');
})

app.get('/voucher', (req, res) => {
    res.render('voucher');
})

app.get('/pricing', (req, res) => {
    res.render('pricing');
})

app.get('/contact', (req, res) => {
    res.render('contact');
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})