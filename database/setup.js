const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();

// Create database and models
const db = new Sequelize({ 
    dialect: 'sqlite', 
    storage: `database/${process.env.DB_NAME}` || 'database/music_library.db', 
    logging: console.log
})

async function setupDatabase() { 
    try { 
        await db.authenticate(); 
        console.log('Connection to database established successfully.'); 

        await db.sync({ force: true })
        console.log('Database file created at:', `database/${process.env.DB_NAME}`); 

        await db.close(); 
    } catch (error) { 
         console.error('Unable to connect to the database:', error); 
    } 
}

// Define track model
const Track = db.define('Track', {
    trackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    songTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    artistName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    albumName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    releaseYear: {
        type: DataTypes.INTEGER
    }
});


// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase();
}