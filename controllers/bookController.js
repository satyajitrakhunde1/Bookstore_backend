


const Book = require('../models/Book');

exports.getBooks = async (req, res, next) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        next(error);
    }
};

exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        next(error);
    }
};

exports.createBook = async (req, res, next) => {
    try {
        const { title, author, category, description, price } = req.body;

        const book = new Book({
            title,
            author,
            category,
            description,
            price,
        });

        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        next(error);
    }
};

exports.updateBook = async (req, res, next) => {
    try {
        const { title, author, category, description, price } = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = title;
        book.author = author;
        book.category = category;
        book.description = description;
        book.price = price;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        next(error);
    }
};

exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await Book.deleteOne({ _id: req.params.id }); // Use deleteOne instead of remove
        res.json({ message: 'Book removed' });
    } catch (error) {
        next(error);
    }
};
