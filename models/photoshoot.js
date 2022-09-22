const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Image model

const ImageSchema = new Schema({ 
        url: String,
        filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

//Photoshoot model

const photoShootSchema = new Schema({
    images: [ImageSchema],
    // description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Kid = mongoose.model('Kid', photoShootSchema);
const Family = mongoose.model('Family', photoShootSchema);
const Tummy = mongoose.model('Tummy', photoShootSchema);
const Newborn = mongoose.model('Newborn', photoShootSchema);
const Communion = mongoose.model('Communion', photoShootSchema);
const Christmass = mongoose.model('Christmas', photoShootSchema);

module.exports = {
    Kid,
    Family,
    Tummy,
    Newborn,
    Communion,
    Christmas
}