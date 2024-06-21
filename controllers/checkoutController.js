// controllers/checkoutController.js

const Checkout = require('../models/Checkout');

exports.getCheckoutList = async (req, res, next) => {
  try {
    const checkoutList = await Checkout.find({}).populate('user').populate('book');
    res.json(checkoutList);
  } catch (error) {
    next(error);
  }
};
