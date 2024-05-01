import mongoose, { Schema } from 'mongoose'


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary'],
        required: true
    },
    photos: [{
        type: String
    }],
    phone: {
        type: Number,
        required: true
    },
    profile: {
        type: {
            type: String
        },
        description: {
            type: String
        },
        preferences: {
            type: String
        },
        hobbies: {
            type: String
        },
        interests: {
            type: String
        }
    },

    matches: [{
        type: Schema.Types.ObjectId, ref: 'Match'
    }],
    conversations: [{
        type: Schema.Types.ObjectId, ref: 'Conversation'
    }]

})


const User = mongoose.model('User', userSchema)

export default User