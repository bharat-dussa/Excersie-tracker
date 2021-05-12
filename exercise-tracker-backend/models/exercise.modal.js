const mongoose = require('mongoose')

const ExerciseShema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }

}, { timestamp: true })

const Exercise = mongoose.model('Exercise', ExerciseShema);

module.exports = Exercise;  