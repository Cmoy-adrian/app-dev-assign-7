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
app.get('/api/tracks', async (req, res) => {
    try {
        const tracks = await Track.findAll();
        res.json(tracks);
    } catch (error) {
        console.error('Error fetching tracks:', error);
        res.status(500).json({error: 'Failed to fetch tracks'});
    }
});

// GET /api/tracks/:id - Returns the track for the requested id using .findByPk(). Handle cases where the track doesn’t exist.
app.get('/api/tracks/:id', async (req, res) => {
    try {
        const track = await Track.findByPk(req.params.id);

        if (!track) {
            return res.status(404).json({error: 'Track not found'});
        }
        
        res.json(track);
    } catch (error) {
        console.error('Error fetching track:', error);
        res.status(500).json({ error: 'Failed to fetch track'});
    }
});

// POST /api/tracks - Create a new track using the .create() method. Include input validation to ensure required fields are provided.
app.post('/api/tracks', async (req, res) => {
    try {
        const {songTitle, artistName, albumName, genre, duration, releaseYear} = req.body;

        const newTrack = await Track.create({
            songTitle,
            artistName,
            albumName,
            genre,
            duration,
            releaseYear
        });

        res.status(201).json(newTrack);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({error: 'Failed to create track'});
    }
});

// PUT /api/tracks/:id - Update an existing track based on the id provided using .update(). Handle cases where the track doesn't exist.
app.put('/api/tracks/:id', async (req, res) => {
    try {
        const {songTitle, artistName, albumName, genre, duration, releaseYear} = req.body;

        const [updatedRowCount] = await Track.update(
            {songTitle, artistName, albumName, genre, duration, releaseYear},
            {where: {id: req.params.id}}
        );

        if (updatedRowCount === 0) {
            return res.status(404).json({ error: 'Track not found'});
        }

        const updatedTrack = await Track.findByPk(req.params.id);
        res.json(updatedTrack);
    } catch (error) {
        console.error('Error updating track:', error);
        res.status(500).json({ error: 'Failed to update track'});
    }
});

// DELETE /api/tracks/:id - Delete a track based on the id provided using the .destroy() method. Handle cases where the track doesn't exist.
app.delete('api/tracks/:id', async (req, res) => {
    try {
        const deletedRowsCount = await Track.destroy({
            where: { id: req.params.id }
        });

        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Tracks not found'});
        }

        res.json({ message: 'Track deleted successfully'});
    } catch (error) {
        console.error('Error deleting track:', error);
        res.status(500).json({ error: 'Failed to delete track'});
    }
});
