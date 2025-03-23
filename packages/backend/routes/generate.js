require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const mongoose = require("mongoose");
const router1 = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");



// OpenAI API Setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//google gimini 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Content Schema
const ContentSchema = new mongoose.Schema({
    prompt: String,
    generatedText: String,
    createdAt: { type: Date, default: Date.now }
});
const Content = mongoose.model('Content', ContentSchema);

// Route: Generate AI Content
router1.post('/generate-chat', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        const generatedText = response.choices[0].message.content;

        const newContent = new Content({ prompt, generatedText });
        await newContent.save();

        res.json({ generatedText });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).json({ error: 'AI generation failed' });
    }
});

router1.post('/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ generatedText: response });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" });
    }
});

module.exports = router1;
