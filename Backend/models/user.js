const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    password: { type: String, required: true },
    profilePhoto: { 
        type: String, 
        default: 'https://photosbull.com/wp-content/uploads/2024/05/1000060433.jpg' // Default profile photo
    }, 
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        default: 'Other' // Default gender
    },
    DOB: { 
        type: Date,
        default: new Date('2000-01-01') // Default DOB (e.g., January 1, 2000)
    },
});


const User = mongoose.model('User', userSchema); // Model name should be singular

module.exports = User;
