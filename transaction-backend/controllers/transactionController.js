const Transaction = require('../models/Transaction');

const listTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, searchText } = req.query;
    let query = {};

    if (searchText) {
      query = {
        $or: [
          { title: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
          { price: { $regex: searchText, $options: 'i' } }
        ]
      };
    }

    const transactions = await Transaction.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStatistics = async (req, res) => {
    const { month } = req.params;
  
    try {
      if (!month || isNaN(month) || month < 1 || month > 12) {
        return res.status(400).json({ error: 'Invalid month parameter' });
      }
  
      const transactions = await Transaction.aggregate([
        {
          $match: {
            dateOfSale: {
              $gte: new Date(`2023-${month}-01`),
              $lt: new Date(`2023-${parseInt(month) + 1}-01`)
            }
          }
        },
        {
          $group: {
            _id: null,
            totalSales: { $sum: '$price' },
            totalTransactions: { $sum: 1 }
          }
        }
      ]);
  
      // Ensure that you return an empty array if no transactions are found
      if (transactions.length === 0) {
        transactions.push({ totalSales: 0, totalTransactions: 0 });
      }

      console.log(transactions);
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({ error: 'Error fetching statistics' });
    }
  };
  

const getBarChartData = async (req, res) => {
  const { month } = req.params;
  // Implement logic to generate bar chart data based on price ranges
};

const getPieChartData = async (req, res) => {
  const { month } = req.params;
  // Implement logic to generate pie chart data based on categories
};

const getCombinedData = async (req, res) => {
  const { month } = req.params;
  // Implement logic to combine data from all APIs and send as a single JSON response
};

module.exports = {
  listTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData
};
