const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const authSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Auth', authSchema);