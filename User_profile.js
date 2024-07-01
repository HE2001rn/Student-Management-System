import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/user-profile', (req, res) => {  // Changed endpoint to avoid conflict
    const sql = "INSERT INTO userprofile (`userName`, `email`, `mobileNumber`, `position`, `password`) VALUES (?)";
    const values = [
        req.body.userName,
        req.body.email,
        req.body.mobileNumber,
        req.body.position,
        req.body.password
    ];
    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.json({ Error: "Failed query", Details: err.message });
        }
        console.log('Query Result:', result); // Log query result
        return res.json({ Status: "Success" });
    });
});

export default router;
