// Import express and database/ models
const express = require('express');
const {db, Track} = require('./database/setup');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Test database connection
async function testConnection() {
    try {
        await db.authenticate();
        console.log('Connection to database established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

// Endpoints
// GET /api/tracks - Returns all tracks in the database using .findAll().


// GET /api/tracks/:id - Returns the track for the requested id using .findByPk(). Handle cases where the track doesn’t exist.


// POST /api/tracks - Create a new track using the .create() method. Include input validation to ensure required fields are provided.


// PUT /api/tracks/:id - Update an existing track based on the id provided using .update(). Handle cases where the track doesn't exist.


// DELETE /api/tracks/:id - Delete a track based on the id provided using the .destroy() method. Handle cases where the track doesn't exist.

