import { Router } from "express";
import Match from '../models/matchModel.js'
const matchesRoute = Router()



matchesRoute.get('/matches', async (req, res) => {
    try {
        const matches = await Match.find().populate('user1').populate('user2')
        return res.json(matches)
    }
    catch (err) {
        return res.json(err)
    }
})

matchesRoute.get('/match/:matchId', async (req, res) => {
    const { matchId } = req.params
    try {
        const match = await Match.findById(matchId)
        return res.json(match)
    }
    catch (err) {
        return res.json(err)
    }
})

matchesRoute.put('/matches/:userId/:matchId', async (req, res) => {
    const { userId, matchId } = req.params
    const { status } = req.body
    try {
        const match = await Match.findOne({ _id: matchId, $or: [{ user1: userId }, { user2: userId }] })
        if (!match) return res.status(404).json('Match not found')

        console.log(typeof match.user1, typeof userId)

        if (match.user1.toString() === userId) {
            match.user1_status = status
        }
        else {
            match.user2_status = status
        }

        await match.save()

        return res.json(match)

    }
    catch (err) {
        return res.json(err)
    }


})


export default matchesRoute