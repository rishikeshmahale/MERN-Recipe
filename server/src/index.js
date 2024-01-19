
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import userRouter from "../routes/userRoutes.js";
import recipeRouter from "../routes/recipeRoutes.js"

const app = express();
const port = 8000;
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

app.get("/", (req, res) => {
    res.json({
        "message" : "Hello"
    })
})

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on Port ${port}`)
})

