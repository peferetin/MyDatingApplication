import mongoose, { Schema } from 'mongoose'


const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    receiver: {
        type: Schema.Types.ObjectId, ref: 'User', required: true
    },
    content: {
        type: String, required: true
    },
    conversation: {
        type: Schema.Types.ObjectId, ref: 'Conversation', required: true
    }
}, { timestamps: true })


const Message = mongoose.model('Message', messageSchema)

export default Message