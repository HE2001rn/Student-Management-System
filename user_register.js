// user_register.js
import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const checkEmailSql = 'SELECT * FROM students WHERE email = ?';
    con.query(checkEmailSql, [email], async (err, results) => {
      if (err) {
        console.error('Error checking email:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        // Email already exists
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Insert the new user into the database
      const insertUserSql = 'INSERT INTO students (username, email, password) VALUES (?, ?, ?)';
      con.query(insertUserSql, [username, email, password], (err, result) => {
        if (err) {
          console.error('Error inserting user into database:', err);
          return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error in signup process:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
