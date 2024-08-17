const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    profilePhoto: { type: String }, 
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    DOB: { type: Date }, // Date of Birth
});

const User = mongoose.model('User', userSchema); // Model name should be singular

module.exports = User;
