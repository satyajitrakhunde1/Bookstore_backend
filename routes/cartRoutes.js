
const express = require('express');
const { getCartItems, addCartItem, removeCartItem } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getCartItems)
  .post(protect, addCartItem);

router.route('/:id')
  .delete(protect, removeCartItem);

module.exports = router;



