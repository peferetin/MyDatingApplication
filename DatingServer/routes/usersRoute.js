import { Router } from 'express'
import User from '../models/userModel.js'
import express from 'express'
import upload from '../middleware/uploadImage.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// const usersRoute = express.Router() applicable when {Router} is not imported from express
const usersRoute = Router()


usersRoute.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        return res.json(users)
    }
    catch (err) {
        return res.json(err)
    }
})

usersRoute.get('/random/user', async (req, res) => {
    try {
        const user = await User.aggregate([{ $sample: { size: 1 } }])
        // const user = await User.find()



        const newMatch = await Match.create({
            user1: IdleDeadline,
            user2: user[0]._id
        })
        return res.json(newMatch)

    }
    catch (err) {
        return res.json(err)
    }
})


usersRoute.post('/users/register', upload.single('image'), async (req, res) => {
    const { username, email, password, age, gender, phone } = req.body
    const { type, description, preferences, hobbies, interests } = req.body.profile
    try {

        const emailVerification = await User.findOne({ email: email })
        if (emailVerification) return res.status(400).json('Email already taken')
        console.log(emailVerification);

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            phone,
            profile: {
                type,
                description,
                preferences,
                hobbies,
                interests
            }
        })

        console.log(newUser);
        await newUser.save()
        return res.status(201).json(newUser)
    }
    catch (err) {
        return res.json(err)
    }
})



export default usersRoute