const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kitSchema = new Schema({
    name: {type: String, required: true},
    link: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String, required: true},
    environment: {type: String, required: true},
    subTool: {type: String, required: false /*, default: 'Was not specified'*/},
    setupTime: {type: Number, required: false},
    popularity: {type: Number, required: false},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('kit', kitSchema);
