import express from "express";
import dotenv from "dotenv"

dotenv.config();

const app = express()

app.get("/", (req, res) => {
    res.json({message: "Welcome to the VIT Student Remainder App API!"});
});

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
})