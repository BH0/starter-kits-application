var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    githubId: {type: String, required: true},
    username: {type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);
