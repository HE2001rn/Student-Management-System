// List2.jsx
import React, { useState, useEffect } from 'react';
import './list2.css';
import Head from '../../Component/Head/head';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderRadius: theme.shape.borderRadius,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderRadius: theme.shape.borderRadius,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const List2 = () => {
    const [courses, setCourses] = useState([]);
    const [openDetails, setOpenDetails] = useState({});

    useEffect(() => {
        // Fetch courses from the backend
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/course-list');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleOpenDetails = (courseId) => {
        setOpenDetails({ ...openDetails, [courseId]: !openDetails[courseId] });
    };

    return (
        <div>
            <Head />
            <div className='big-rect8'>
                <div>
                    <h2 className='top-head8'>Welcome To Course List!</h2>
                </div>
                <div className='std-table-rect8'>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Course ID</StyledTableCell>
                                    <StyledTableCell align="center">Course Name</StyledTableCell>
                                    <StyledTableCell align="center">Course Coordinator</StyledTableCell>
                                    <StyledTableCell align="center">Course Detail</StyledTableCell>
                                    <StyledTableCell align="center">Coordinator Phone Number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((course) => (
                                    <React.Fragment key={course.CourseID}>
                                        <StyledTableRow>
                                            <StyledTableCell align="center">{course.CourseID }</StyledTableCell>
                                            <StyledTableCell align="center">{course.CourseName}</StyledTableCell>
                                            <StyledTableCell align="center">{course.CourseCoordinator}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                                    onClick={() => handleOpenDetails(course.CourseID)}
                                                >
                                                    {openDetails[course.CourseID] ? 'Hide Details' : 'View'}
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{course.PhoneNumber}</StyledTableCell>
                                        </StyledTableRow>
                                        {openDetails[course.CourseID] && (
                                            <TableRow>
                                                <StyledTableCell colSpan={5}>
                                                    <p>{course.DescriptionOfCourse }</p>
                                                    <p>Duration: {course.CourseDuration}</p>
                                                    <p>Number of Students: {course.NoOfStudents}</p>
                                                </StyledTableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
};

export default List2;
