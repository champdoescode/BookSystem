const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const uri = 'mongodb+srv://booksystemuser1:tGWLthbJst9kju2j@booksystem.e6kcjyz.mongodb.net/databasebook';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: String,
  mobileNumber: String,
  password: String,
  userType: String,
  loginTime: Date,
  logoutTime: Date
}, { collection: 'registrationdata' });

const bookSchema = new mongoose.Schema({
  bookName: String,
  bookAuthor: String,
  bookPrice: String,
  bookImage: String,
  bookDescription: String,  // Corrected spelling here
  numberOfCopies: String,
}, { collection: 'addbook' });

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

app.post('/register', async (req, res) => {
  const { fullName, username, email, mobileNumber, password, userType } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, username, email, mobileNumber, password, userType });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && bcrypt.compare(password, user.password)) {
      user.loginTime = new Date();
      await user.save();
      res.status(200).json({ message: 'Login successful', userType: user.userType });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.post('/logout', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      user.logoutTime = new Date();
      await user.save();
      res.status(200).json({ message: 'Logout successful' });
    } else {
      res.status(400).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send('User deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

app.post('/addbook', async (req, res) => {
  const { bookName, bookAuthor, bookPrice, bookImage, bookDescription, numberOfCopies } = req.body;
  try {
    const book = new Book({ bookName, bookAuthor, bookPrice, bookImage, bookDescription, numberOfCopies });
    await book.save();
    res.status(201).send('Book added successfully');
  } catch (error) {
    res.status(400).send('Error adding book');
  }
});
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send('Error fetching books');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
