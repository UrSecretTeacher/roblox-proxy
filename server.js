const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/friends/:username", (req, res) => {
    const username = req.params.username;
    res.json({ user: username, friends: ["Friend1","Friend2"] });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
