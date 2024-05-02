import Match from '../models/matchModel'
import express from 'express'

const matchRoute = express.Router()

matchRoute.get('/match/:userId', (req, res) => {
    try {
        const userId = req.params.userId;
        const currentUser = users.find(user => user.id == userId);

        if (!currentUser) {
            throw new Error("User not found");
        }


        const potentialMatches = users.filter(user => user.id != userId);
        const randomIndex = Math.floor(Math.random() * potentialMatches.length);
        const matchedUser = potentialMatches[randomIndex];


        res.status(200).json(matchedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});