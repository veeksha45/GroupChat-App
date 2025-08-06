const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
};
