const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../bookstore-backend/models/User');

const createAdmin = async () => {
  await mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const hashedPassword = await bcrypt.hash('adminpass', 10);

  const adminUser = new User({
    name: 'admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin'
  });

  await adminUser.save();
  console.log('Admin user created');
  mongoose.disconnect();
};

createAdmin();
