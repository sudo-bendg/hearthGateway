const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    const configPath = path.join(__dirname, '../config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);
    res.json(config);
  } catch (error) {
    console.error('Error loading config.json:', error);
    res.status(500).json({ error: 'Unable to load configuration' });
  }
});

module.exports = router;