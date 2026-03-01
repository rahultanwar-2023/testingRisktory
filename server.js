const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const PORT = 3000;

// Temporary users storage
const users = {};

// ==========================
// Generate API KEY
// ==========================
app.get("/generate-key", (req, res) => {

    const email = req.query.email;

    if(!email){
        return res.send("Provide email ?risktoryjournal@gmail.com");
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

    const apiKey = req.body.api_key;

    if (!users[apiKey]) {
        return res.status(401).json({error:"Invalid API Key"});
    }

    console.log("DATA RECEIVED:", req.body);

    res.json({status:"success"});
});

app.listen(PORT, () =>
    console.log(`Antigravity API running on ${PORT}`)
);