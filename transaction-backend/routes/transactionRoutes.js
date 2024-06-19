const express = require('express');
const router = express.Router();
const { listTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData } = require('../controllers/transactionController');

router.get('/transactions', listTransactions);
router.get('/statistics/:month', getStatistics);
router.get('/barchart/:month', getBarChartData);
router.get('/piechart/:month', getPieChartData);
router.get('/combinedData/:month', getCombinedData);

module.exports = router;
