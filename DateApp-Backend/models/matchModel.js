import mongoose, { Schema } from 'mongoose'


const matchSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    user1_status: {
        type: String,
        enum: ['pending', 'declined', 'accepted'],
        default: 'pending'
    },
    user2_status: {
        type: String,
        enum: ['pending', 'declined', 'accepted'],
        default: 'pending'
    }
}, { timestamps: true })



const Match = mongoose.model('Match', matchSchema)

export default Match