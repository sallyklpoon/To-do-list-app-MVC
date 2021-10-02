let mongoose = require('mongoose');

let Scheme = mongoose.Schema;

let itemsSchema = new Scheme({
    item: String,
    user: String
});

module.exports = mongoose.model('items', itemsSchema);