const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM blogs ORDER BY date_created DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching blogs' });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM blogs WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the blog' });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const { title, subtitle, content, main_image, sub_images, author_name } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO blogs (title, subtitle, content, main_image, sub_images, author_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, subtitle, content, main_image, sub_images, author_name]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the blog' });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, main_image, sub_images, author_name } = req.body;
    const { rows } = await pool.query(
      'UPDATE blogs SET title = $1, subtitle = $2, content = $3, main_image = $4, sub_images = $5, author_name = $6, last_modified = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
      [title, subtitle, content, main_image, sub_images, author_name, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the blog' });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM blogs WHERE id = $1', [id]);
    if (rowCount === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the blog' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});