const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/aboutMe', (req, res) => {
    res.render('aboutMe');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})