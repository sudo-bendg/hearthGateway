require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HearthGateway server running on port ${PORT}`);
});