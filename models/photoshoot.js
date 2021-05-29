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
    title: String,
    images: [ImageSchema],
    // description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Kids = mongoose.model('Kids', photoShootSchema);

module.exports = {
    // Family,
    Kids
}