const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})