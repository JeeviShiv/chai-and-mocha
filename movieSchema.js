const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name:String,
    rating:Number,
    genre:String,
    inStock:Number
});

mongoose.model('movies', movieSchema);
module.exports = mongoose.model('movies');