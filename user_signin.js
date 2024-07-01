import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  // Static admin credentials
  if (username === 'Admin' && password === 'Admin@123') {
    req.session.userId = 'admin'; // Example for admin user
    return res.status(200).json({ message: 'Login successful', role: 'admin' });
  }

  try {
    // Check if the username and password match a user in the database
    const checkUserSql = 'SELECT id FROM students WHERE username = ? AND password = ?';
    con.query(checkUserSql, [username, password], (err, results) => {
      if (err) {
        console.error('Error checking user credentials:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        // Username or password is incorrect
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      const userId = results[0].id;
      req.session.userId = userId;
      // Successful login
      res.status(200).json({ message: 'Login successful', role: 'student' });
    });
  } catch (error) {
    console.error('Error in signin process:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
