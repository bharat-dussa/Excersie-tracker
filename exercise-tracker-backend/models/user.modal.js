const mongoose = require('mongoose')

const UserSchema = mongoose.Schema;

const userSchema = UserSchema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3,
        required: true
    },
}, {
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;