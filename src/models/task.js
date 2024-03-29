const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })
const Task = mongoose.model('Task',taskSchema)
module.exports = Task;