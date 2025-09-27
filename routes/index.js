const express = require('express');
const router = express.Router();
const config = require('../config.json')

const configRouter = require('./config');

// router.use('/config', configRouter);

router.use('/', async (req, res, next) => {

  // Handle requests to gateway
  if (req.url === '' || req.url === '/') {
    res.status(200).json({ message: 'Hello, world!' });
    return;
  }

  const trimmedURL = req.url.substring(1);

  if (trimmedURL.charAt(0) === '/') {
    res.status(400).json({ message: 'bad request'} )
    return;
  }

  const firstSlash =  trimmedURL.indexOf('/');
  let service = '';
  let relPath = '';

  if (firstSlash >= 0) {
    service = trimmedURL.substring(0, firstSlash)
    relPath = trimmedURL.substring(firstSlash + 1);
  } else {
    service = trimmedURL;
  }

  let services = config.services

  if (config.services[service]) {
    try {
      const response = await fetch(config.services[service].url);
      if (!response.ok) {
        res.status(500).json({ message: response.status })
        return;
      } else {
        const data = await response.json();
        res.status(200).json(data);
        return;
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
      return;
    }
  } else {
    res.status(404).json({ message: "Service not found" });
    return;
  }

  res.status(200).json({ message: `Request to\nservice: ${service}\nrelPath: ${relPath}` });
})

// router.get('/', (req, res) => {
//   res.json({ message: 'Hello, world!' });
// });

module.exports = router;