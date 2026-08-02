const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const skinRoutes = require('./routes/skin.routes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.use('/api/skin', skinRoutes);
app.get('/', (req, res) => res.send('Skincare API is running'));

module.exports = app;