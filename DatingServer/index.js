import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import matchesRoute from './routes/matchesRoute.js'
import usersRoute from './routes/usersRoute.js'




const app = express()



app.use(cors()),
    app.use(express.json())
app.use('/api', usersRoute, matchesRoute)

app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI)



// app.get('/', (req, res) => {
//     return res.json(' This is my Dating application App')
// })
// app.get('/users', upload.single('image'), (req, res) => {
//     const user = new User({

//     })
// })

app.get('/', (req, res) => {
    res.send('Hello World: Welcome to my Dating App')
})




app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})