import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import con from './db.js'; 

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

// Existing course-list route
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

// New route for editing a course
router.put('/course-edit/:courseId', (req, res) => {
    const { courseId } = req.params;
    const {
        courseName,
        moduleCoordinatorName,
        coordinatorPhoneNumber,
        noOfStudent,
        courseDuration,
        descriptionOfCourse
    } = req.body;

    const query = `
        UPDATE course
        SET CourseName = ?, CourseCoordinator = ?, PhoneNumber = ?, NoOfStudents = ?, CourseDuration = ?, DescriptionOfCourse = ?
        WHERE CourseID = ?
    `;
    const values = [courseName, moduleCoordinatorName, coordinatorPhoneNumber, noOfStudent, courseDuration, descriptionOfCourse, courseId];

    con.query(query, values, (err, results) => {
        if (err) {
            console.error('Error updating course:', err);
            res.status(500).send('Internal Server Error');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Course not found');
        } else {
            res.status(200).send('Course updated successfully');
        }
    });
});


export default router;
