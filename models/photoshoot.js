const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoShootSchema = new Schema({
    title: String,
    description: String
});

const Family = mongoose.model('Family', photoShootSchema);
const Kids = mongoose.model('Kids', photoShootSchema);

module.exports = {
    Family,
    Kids
}