const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("AkiraTalk Backend is running!");
});

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                error: "Message is required."
            });
        }

        // Gemini API will be connected here later
        res.json({
            reply: "Backend received your message: " + message
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Something went wrong."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`AkiraTalk Backend running on port ${PORT}`);
});
