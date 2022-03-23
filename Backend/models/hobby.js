const mongoose = require('mongoose');
const HobbySchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 50 },
    description: { type: String, required: true },
    doc: { type: Date, required: true },
});
module.exports = mongoose.model('Hobby', HobbySchema);
