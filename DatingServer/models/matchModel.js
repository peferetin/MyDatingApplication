import mongoose, { Schema } from 'mongoose'


const matchSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    user2: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    status: {
        type: String,
        enum: ['pending', 'declined', 'accepted']
    }
})



const Match = mongoose.model('Match', matchSchema)

export default Match