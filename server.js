const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
// server.js or app.js
const cartRoutes = require('./routes/cartRoutes');

// server.js
const checkoutRoutes = require('./routes/checkoutRoutes');



dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  
  // other middleware and routes setup
  app.use('/api/checkout', checkoutRoutes);
  app.use('/api/cart', cartRoutes);  //added later
  app.use('/api/auth', authRoutes);
  app.use('/api/books', bookRoutes);
  
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
