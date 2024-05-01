import mongoose, { Schema } from 'mongoose'


const conversationSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    user2: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    }
})


const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation