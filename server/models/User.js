const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    collegeId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', UserSchema);
