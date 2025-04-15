
// SIGNUP Controller
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product'); // add this

// SIGNUP Controller
const signupUser = async (req, res) => {
  const { username, email, password, role, product } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user (without product info here)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await newUser.save();

    // If artisan, save product separately
    if (role === 'artisan' && product) {
      const newProduct = new Product({
        ...product,
        artisan: savedUser._id // associate product with user
      });

      await newProduct.save();
    }

    res.status(201).json({ message: 'User and product created successfully', user: savedUser });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: err.message });
  }
};


// LOGIN Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signupUser, loginUser };
