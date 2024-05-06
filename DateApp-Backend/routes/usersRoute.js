import { Router } from "express";
import User from '../models/userModel.js'
import Match from '../models/matchModel.js'
import upload from '../middleware/uploadImage.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verify from '../middleware/verify.js'
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

usersRoute.get('/users/:id', verify, async (req, res) => {
    const { id } = req.params
    try {
        const users = await User.findById(id)
        return res.json(users)
    }
    catch (err) {
        return res.json(err)
    }
})

usersRoute.get('/random/user/:id', async (req, res) => {
    const { id } = req.params
    try {
        // const user = await User.aggregate([

        //     { _id: { $ne: id } },
        //     { $sample: { size: 1 } }
        // ])
        // const usersGreaterThan20 = await User.find({gender : {$eq : 'female'}})
        // return res.json(usersGreaterThan20)

        // we are searching in the users, where the _id is not equal to the req.params.id
        const users = await User.find({ _id: { $ne: id } })
        // we are generating a number between 0 and the length of the array of users
        const randomNumber = Math.floor(Math.random() * users.length)
        // we select one random user
        const randomUser = users[randomNumber]
        // we create a match where the user1 id is the req.params.id and the user2 id is the random user 
        const newMatch = await Match.create({
            user1: id,
            user2: randomUser._id
        })
        // we update the matches field in the user model with the match id
        await User.findByIdAndUpdate(id, { $push: { matches: newMatch._id } })
        await User.findByIdAndUpdate(randomUser._id, { $push: { matches: newMatch._id } })

        return res.json(newMatch)

    }
    catch (err) {
        return res.json(err)
    }
})


usersRoute.post('/register', upload.single('image'), async (req, res) => {
    const { username, email, password, age, gender, phone } = req.body
    const { type, description, preferences, hobbies, interests } = req.body.profile
    try {
        const emailVerification = await User.findOne({ email: email })
        if (emailVerification) return res.status(400).json('Email already taken')

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await new User({
            username,
            email,
            password: hashedPassword,
            age,
            gender,
            phone,
            // profile: {
            //     type,
            //     description,
            //     preferences,   //  not needed yet 
            //     hobbies,
            //     interests
            // }
        })
        newUser.save()
        return res.status(201).json(newUser)
    }
    catch (err) {
        return res.json(err)
    }
})


usersRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        // We find the user by it's email
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json('Email or password doesnt exist')

        // We compare the password given (req.body.password) with the user.password
        const passwordVerification = await bcrypt.compare(password, user.password)
        if (!passwordVerification) return res.status(404).json('Email or password doesnt exist')

        const token = await jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET)
        await User.findByIdAndUpdate(user._id, { jwt_token: token })
        res.header('auth-token', token)
        return res.json(`Welcome ${user.username}`)


    }
    catch (err) {
        return res.json(err)
    }
})


usersRoute.post('/users/token', async (req, res) => {
    const { token } = req.body
    try {
        const userByToken = await User.findOne({ jwt_token: token })
        return res.json(userByToken)
    }
    catch (err) {
        return res.json(err)
    }

})







export default usersRoute

