import express from "express";
import dotenv from "dotenv"

dotenv.config();

const app = express()

app.get("/", (req, res) => {
    res.json({message: "Welcome to the VIT Student Reminder App API!"});
});

app.get("/academics", (req, res) => {
    res.json({message: "This is the Academics page API endpoint."});
});

app.get("/events", (req, res) => {
    res.json({message: "This is the Events page API endpoint."});
});

app.get("/clubs", (req, res) => {
    res.json({message: "This is the Clubs page API endpoint."});
});

app.get("/hostel", (req, res) => {
    res.json({message: "This is the Hostel page API endpoint."});
});

app.get("/profile", (req, res) => {
    res.json({message: "This is the Profile page API endpoint."});
});

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
})