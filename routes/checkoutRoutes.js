// routes/checkoutRoutes.js
const express = require('express');
const { getCheckoutList } = require('../controllers/checkoutController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, admin, getCheckoutList);

module.exports = router;
