const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const PhotoSession = new Schema({
    title: String,
    image: String,
    description: String,
    date: String,
})

module.exports = mongoose.model('Session', PhotoSession);