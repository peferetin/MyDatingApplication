import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';




const app = express()



app.use(cors()),
    app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI)










app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})