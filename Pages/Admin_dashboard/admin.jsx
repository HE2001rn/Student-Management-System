import React, { useState, useEffect } from 'react';
import './admin.css';
import Head from '../../Component/Head/head';
import Image1 from '../../assets/student.png';
import Image2 from '../../assets/teacher.png';
import Image3 from '../../assets/online-course.png';
import Image5 from '../../assets/moon.png';
import Image6 from '../../assets/person.png';
import Image7 from '../../assets/lecturer.png';
import Image8 from '../../assets/arrow.png';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';

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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Admin = () => {
    const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/stats');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched stats:', data); // Log fetched data
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error.message);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/students');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched students:', data); // Log fetched data
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error.message);
            }
        };

        fetchStats();
        fetchStudents();
    }, []);

    const img1 = {
        width: '30%',
    };

    return (
        <div>
            <Head />
            <div className='big-rect'>
                <div>
                    <h2 className='top-head'>Welcome To Admin Dashboard!</h2>
                </div>

                <div className='xs-main-rect'>
                    <div className='xs-rect'>
                        <h3 className='student'>Students</h3>
                        <img src={Image1} alt="image" style={img1} className='std-icon' />
                        <h1 className='quantity'>{stats.students}</h1>
                    </div>
                    <div className='xs-rect'>
                        <h3 className='student'>Teachers</h3>
                        <img src={Image2} alt="image" style={img1} className='std-icon' />
                        <h1 className='quantity'>{stats.teachers}</h1>
                    </div>
                    <div className='xs-rect'>
                        <h3 className='student'>Courses</h3>
                        <img src={Image3} alt="image" style={img1} className='std-icon' />
                        <h1 className='quantity'>{stats.courses}</h1>
                    </div>
                </div>

                <div className='m-main-rect'>
                    <div className='m-rect'>
                        <h3 className='tp'>Overview</h3>
                        <Box sx={{ width: '100%', maxWidth: 500 }}>
                            <LineChart
                                xAxis={[{ data: [1, 10, 30, 50, 70, 90, 100] }]}
                                yAxis={[
                                    { id: 'linearAxis', scaleType: 'linear' },
                                    { id: 'logAxis', scaleType: 'log' },
                                ]}
                                series={[
                                    { yAxisKey: 'linearAxis', data: [1, 10, 30, 50, 70, 90, 100], label: 'Lec' },
                                    { yAxisKey: 'logAxis', data: [1, 10, 30, 50, 70, 90, 100], label: 'Std' },
                                ]}
                                leftAxis="linearAxis"
                                rightAxis="logAxis"
                                height={190}
                            />
                        </Box>
                    </div>
                    <div className='m-rect'>
                        <h3 className='tp'>Events</h3>
                        <div className='lbl-1'>
                            <img src={Image5} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>Poya Day In Chaithya At 12.00p.m.</h5>
                            </div>
                        </div>
                        <div className='lbl-2'>
                            <img src={Image6} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>Sharamadana 23/04/2024</h5>
                            </div>
                        </div>
                        <div className='lbl-2'>
                            <img src={Image7} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>Guest lecture 24/04/2024</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='m-main-rect'>
                    <div className='m-rect'>
                        <h3 className='tp'>Student Details</h3>
                        <TableContainer component={Paper} sx={{ borderRadius: 4 }}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="left">Student ID</StyledTableCell>
                                        <StyledTableCell align="center">First Name</StyledTableCell>
                                        <StyledTableCell align="center">Last Name</StyledTableCell>
                                        <StyledTableCell align="center">Gender</StyledTableCell>
                                        <StyledTableCell align="center">Age</StyledTableCell>
                                        <StyledTableCell align="center">Email</StyledTableCell>
                                        <StyledTableCell align="center">Phone Number</StyledTableCell>
                                        <StyledTableCell align="center">Course Name</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <StyledTableRow key={student.studentId}>
                                            <StyledTableCell component="th" scope="row">
                                                {student.studentId}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{student.firstName}</StyledTableCell>
                                            <StyledTableCell align="center">{student.lastName}</StyledTableCell>
                                            <StyledTableCell align="center">{student.gender}</StyledTableCell>
                                            <StyledTableCell align="center">{student.age}</StyledTableCell>
                                            <StyledTableCell align="center">{student.email}</StyledTableCell>
                                            <StyledTableCell align="center">{student.phoneNumber}</StyledTableCell>
                                            <StyledTableCell align="center">{student.courseName}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='m-rect'>
                        <h3 className='tp'>Student Activity</h3>
                        <div className='lbl-1'>
                            <img src={Image8} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>CS Assignment Submissions</h5>
                            </div>
                        </div>
                        <div className='lbl-2'>
                            <img src={Image8} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>CS Assignment Submission</h5>
                            </div>
                        </div>
                        <div className='lbl-2'>
                            <img src={Image8} className='lbl-icon' />
                            <div className='lbl-detail'>
                                <h5>MAD Assignment Submission</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
