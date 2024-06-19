const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/api', transactionRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/mern-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
  app.listen(5000, () => console.log('Server running on port 5000.'));
}).catch(err => {
  console.error('Connection error:', err);
});
