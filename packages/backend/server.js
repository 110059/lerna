// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');  // Import your auth.js file
const cors = require('cors');  // Import cors


// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from this origin (your frontend URL)
    methods: ['GET', 'POST'], // Allow only these methods (can be adjusted as needed)
    credentials: true, // Enable cookies if needed
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB URI in .env)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

// Use the auth routes
app.use('/auth', authRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});