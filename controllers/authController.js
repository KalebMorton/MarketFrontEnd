const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUserInDB } = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUserInDB(username, hashedPassword);

    res.status(201).json({ message: 'User registered', user: newUser.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '30d' });

    res
      .cookie('username', user.username, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
};
