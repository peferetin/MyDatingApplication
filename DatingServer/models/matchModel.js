import mongoose, { Schema } from 'mongoose'

const matchSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    user1_status: {
        type: String,
        enum: ['pending', 'declined', 'accepted']
    },
    user2_status: {
        type: String,
        enum: ['pending', 'declined', 'accepted']
    }
})

const Match = mongoose.model('Match', matchSchema)

export default Match