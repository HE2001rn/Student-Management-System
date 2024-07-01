import express from 'express';
import con from './db.js';

const router = express.Router();

router.get('/course-list', (req, res) => {
    const query = 'SELECT * FROM course';
    con.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(results);
        }
    });
});

export default router;
