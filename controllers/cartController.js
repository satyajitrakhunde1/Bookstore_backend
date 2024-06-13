
const CartItem = require('../models/Cart');
const Book = require('../models/Book');

// Get cart items for the logged-in user
exports.getCartItems = async (req, res, next) => {
    try {
        const cartItems = await CartItem.find({ user: req.user._id }).populate('book');
        res.json(cartItems);
    } catch (error) {
        next(error);
    }
};

// Add a cart item for the logged-in user
exports.addCartItem = async (req, res, next) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user._id;

        // Find the book by ID to include its details in the response
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the item is already in the cart
        const existingCartItem = await CartItem.findOne({ user: userId, book: bookId });

        if (existingCartItem) {
            // If the item is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        } else {
            // If the item is not in the cart, add it
            const cartItem = new CartItem({
                user: userId,
                book: bookId,
                quantity,
            });

            await cartItem.save();
        }

        res.status(201).json({
            _id: book._id,
            title: book.title,
            author: book.author,
            category: book.category,
            price: book.price,
            quantity: quantity,
        });
    } catch (error) {
        next(error);
    }
};

// Remove a cart item for the logged-in user
exports.removeCartItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Find and remove the cart item by ID and user
        const cartItem = await CartItem.findOneAndDelete({ _id: id, user: userId });

        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        next(error);
    }
};
