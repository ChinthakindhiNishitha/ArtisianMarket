
// SIGNUP Controller
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product');

const signupUser = async (req, res) => {
  const { username, email, password, role, product } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    console.log(`Received role: ${role}`);

    // If artisan, save product as well
    if (role === 'artisan' && product) {
      const newProduct = new Product({
        artisan: newUser._id,
        productType: product.productType,
        productName: product.productName,
        imageUrl: product.imageUrl,
        location: product.location,
        price: product.price,
      });

      await newProduct.save();
      console.log('✅ Product saved for artisan:', newProduct);
    }

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    if (error.code === 11000) {
      console.error('Signup error: Duplicate email');
      res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    } else {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Signup failed. Please try again later.' });
    }
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