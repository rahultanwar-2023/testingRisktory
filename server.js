const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

// RAW body parser (important for MT5)
app.use(express.text({ type: "*/*" }));
const PORT = 3000;

// Temporary users storage
const users = {};

// ==========================
// Generate API KEY
// ==========================

app.get("/generate-key", (req, res) => {

    const email = req.query.email;

    if(!email){
        return res.send("Provide email ?email=test@gmail.com");
    }

    // If user already exists → return same key
    if(users[email]){
        return res.json(users[email]);
    }

    // Create new user
    const user = {
        userId: uuidv4(),
        apiKey: uuidv4()
    };

    users[email] = user;

    res.json(user);
});

// ==========================
// MT5 EA Sync Endpoint
// ==========================
app.post("/sync", (req, res) => {

    try {

        const raw = req.body;

        console.log("RAW DATA:", raw);

        const data = JSON.parse(raw);

        console.log("PARSED DATA:", data);

        res.json({ status: "success" });

    } catch (err) {

        console.log("JSON ERROR:", err.message);
        res.status(400).send("Invalid JSON");

    }
});