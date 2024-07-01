// course_add.js

import express from 'express';
import con from './db.js';

const router = express.Router();

router.post('/course-add', (req, res) => { // Change the route path to '/'
    const sql = "INSERT INTO course (`CourseID`, `CourseName`, `CourseCoordinator`, `PhoneNumber`, `NoOfStudents`, `CourseDuration`, `DescriptionOfCourse`) VALUES (?)";
    const values = [ 
        req.body.courseId,  
        req.body.courseName,  
        req.body.moduleCoordinatorName,  
        req.body.coordinatorPhoneNumber, 
        req.body.noOfStudent, 
        req.body.courseDuration, 
        req.body.descriptionOfCourse 
    ];

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            res.status(500).json({ error: 'Database Error: ' + err.message });
            return;
        }
        res.status(200).json({ message: 'Course added successfully', courseId: result.insertId });
    });
});

export default router;
