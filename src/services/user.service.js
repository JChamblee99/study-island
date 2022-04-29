const mongoose = require('mongoose');
require('../database/models/user.model');
const User = mongoose.model("User");


const userService = {
    // Activates user, verifying their email
    activateUser: async (userId) => {
        try {
            await User.findByIdAndUpdate({ _id: userId }, { active: 'active' });
            console.log('User activated');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = userService;