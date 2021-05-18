const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoShootSchema = new Schema({
    title: String,
    images: [
        {
            url: String,
            filename: String}
    ],
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