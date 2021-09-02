const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    longUrl: String,
    shortUrl: String
});

module.exports = mongoose.model('Data', dataSchema, 'UrlShortener');