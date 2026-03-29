const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Project = require('./models/Project'); // import model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/portfolio')
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
  res.send("Backend running successfully");
});

// Add new project (POST)
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects (GET)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
