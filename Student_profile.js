import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/student-profile', (req, res) => { // Change the route path to '/'
    const sql = "INSERT INTO studentprofile (`username`, `email`, `contactNumber`, `courseName`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.contactNumber,
        req.body.courseName,
    ];

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ Error: "Failed query", Details: err.message });
            return;
        }
        console.log('Query Result:', result); // Log query result
        return res.json({ Status: "Success" });
    });
});

router.get('/student-profile', (req, res) => {
    const userId = req.user.id; // Assuming req.user contains the authenticated user's ID
    const query = 'SELECT * FROM studentprofile WHERE userId = ?';

    con.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching profile:', err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length === 0) {
                res.status(404).send('Profile not found');
            } else {
                res.status(200).json(results[0]);
            }
        }
    });
});

export default router;
