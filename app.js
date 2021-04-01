const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://ocalhost:27017/karolina-photo', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})