require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { env } = require('process');

const app = express();
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Middleware
app.use(cors());
app.use(express.json());


// API routes

// Popular movies
app.get('/api/popular', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        res.json(data);
        console.log(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch popular movies' });
    }
});

// Top rated movies
app.get('/api/korean', async (req, res) => {
    try {
         const { query, page } = req.query;
     
         const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=ko&sort_by=popularity.desc`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch top rated movies' });
    }
});

// Upcoming movies
app.get('/api/upcoming', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await fetch(`${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming movies' });
    }
});

// Search movies
app.get('/api/search', async (req, res) => {
    try {
        const { query, page } = req.query;
        const response = await fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page || 1}`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});

// Filter movies
app.get('/api/filter', async (req, res) => {
    try {
        const { genre, language, page } = req.query;
        let url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page || 10}`;
        if (genre) url += `&with_genres=${genre}`;
        if (language) url += `&with_original_language=${language}`;

        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch filtered movies' });
    }
});


// Search movies
app.get('/api/chinese', async (req, res) => {
    try {
        
        const { query, page } = req.query;
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=zh&sort_by=popularity.desc`);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});


// Search movies
app.get('/api/japan', async (req, res) => {
    try {
      
        const { query, page } = req.query;
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=ja&sort_by=popularity.desc`);
       
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});


// Search movies
app.get('/api/cartoon', async (req, res) => {
    try {
        const { query, page } = req.query;
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=en&with_genres=16&sort_by=popularity.desc`);
       
        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search movies' });
    }
});



// Serve frontend for all other routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 

module.exports = app