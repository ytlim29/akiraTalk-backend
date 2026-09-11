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

      const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: message
                        }
                    ]
                }
            ]
        })
    }
);

const data = await response.json();

if (!response.ok) {
    console.error("Gemini API error:", data);

    return res.status(500).json({
        error: "Gemini API request failed."
    });
}

const reply = data.candidates[0].content.parts[0].text;

res.json({
    reply: reply
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
