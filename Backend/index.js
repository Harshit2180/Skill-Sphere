import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";

dotenv.config({});

connectDB()

const app = express();

const PORT = process.env.PORT || 3000;

app.use("api/v1/user", userRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server listening at post ${PORT}`)
})