const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoshootSchema = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Photoshoot', PhotoshootSchema);