const mongoose = require('mongoose');

const psotSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    imagePath: { type: String, require: true },
    userCreatorId: {type: mongoose.Schema.Types.ObjectId, require: true},
    userCreatorName: {type: mongoose.Schema.Types.String, require: true},
});

module.exports = mongoose.model('Post', psotSchema);