import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/contact-us', (req, res) => {  // Changed endpoint to avoid conflict
    const sql = "INSERT INTO contactus (`firstName`, `lastName`, `email`, `contactNumber`, `help`) VALUES (?)";
    const values = [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.contactNumber,
        req.body.help
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

export default router;
