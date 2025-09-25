const express = require('express');
const router = express.Router();

const configRouter = require('./config');

router.use('/config', configRouter);

router.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

module.exports = router;