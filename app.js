const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');
const { urlencoded } = require('express');
const { fileLoader } = require('ejs');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home', { style: 'app' });
})

app.get('/aboutMe', (req, res) => {
    res.render('aboutMe', { style: 'aboutMe' });
})

app.get('/beforePhotoShoot', (req, res) => {
    res.render('beforePhotoShoot', { style: 'beforePhotoShoot' });
})

app.get('/voucher', (req, res) => {
    res.render('voucher', { style: 'voucher' });
})

app.get('/pricing', (req, res) => {
    res.render('pricing', { style: 'pricing' });
})

app.get('/contact', (req, res) => {
    res.render('contact', { style: 'contact' });
})


app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})

