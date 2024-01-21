const joinZoomMeeting = require('./join_meeting_headless.js')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
require("dotenv").config();

const PORT = process.env.PORT || 3000;


app.get("/" , (req , res)=>{
    res.send("Welcome to autoLogin Service");
})

app.post('/', async (req, res) => {
   await joinZoomMeeting(req.body.meetId , req.body.meetPassCode , req.body.joineeName , req.body.sessionId)
   return res.status(200).json({"response" : "Joined Successfully"})
});


app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});