const express = require("express");
const fetch = require("node-fetch");
const app = express();

// Get userId from username
app.get("/userid/:username", async (req,res) => {
    const username = req.params.username;
    try {
        const r = await fetch(`https://users.roblox.com/v1/users/by-username/${username}`);
        const data = await r.json();
        res.json(data); // {id, name, displayName} or error
    } catch(err){
        console.error(err);
        res.json({error:"failed"});
    }
});

// Get all friends for a userId
app.get("/friends/:id", async (req,res) => {
    const userId = req.params.id;
    let friends = [];
    let cursor = null;

    try {
        do {
            let url = `https://friends.roblox.com/v1/users/${userId}/friends`;
            if (cursor) url += `?cursor=${cursor}`;

            const r = await fetch(url);
            const data = await r.json();

            friends = friends.concat(data.data);
            cursor = data.nextPageCursor;
        } while (cursor);

        res.json({ data: friends });
    } catch(err){
        console.error(err);
        res.json({error:"failed"});
    }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
