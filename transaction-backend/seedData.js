
const axios = require('axios');
const mongoose = require('mongoose');
const Transaction = require('./models/Transaction');

const seedDatabase = async () => {
    try {
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const transactions = response.data;
  
      await Transaction.deleteMany({});
      await Transaction.insertMany(transactions);
  
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      mongoose.connection.close();
    }
  };
  

mongoose.connect('mongodb://127.0.0.1:27017/mern-task', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
  seedDatabase();
}).catch(err => {
  console.error('Connection error:', err);
});
