const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({ 
        url: String,
        filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});

const photoShootSchema = new Schema({
    title: String,
    images: [ImageSchema],
    // description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Family = mongoose.model('Family', photoShootSchema);
const Kids = mongoose.model('Kids', photoShootSchema);

module.exports = {
    Family,
    Kids
}