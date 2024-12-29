const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },    
    password: { type: String, required: true },
    profilePhoto: { 
        type: String, 
        default: '/profile/uploads/default.png' // Default profile photo
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
