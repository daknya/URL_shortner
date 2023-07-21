const mongoose = require('mongoose');
const shortId = require('shortid');


const shortUrlSchema = mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        require: true,
        default: shortId.generate
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }



})

module.exports = mongoose.model('shorturl', shortUrlSchema);