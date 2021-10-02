const { intersection } = require('lodash');
let mongoose = require('mongoose');

let Scheme = mongoose.Schema;

let userSchema = new Scheme({
    username: String,
    password: String,
    image: Number,
    itemsArray: [String]
});

module.exports = mongoose.model('users', userSchema);