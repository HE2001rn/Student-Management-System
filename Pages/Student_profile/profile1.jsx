// profile1.js
import React, { useState, useEffect } from 'react';
import './profile1.css';
import Student_head from '../../Component/Student_head/sthead';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const profile1 = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        contactNumber: '',
        courseName: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        contactNumber: '',
        courseName: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/student-profile');
                setFormValues(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setSnackbar({
                    open: true,
                    message: 'Failed to fetch profile',
                    severity: 'error'
                });
            }
        };
        fetchProfile();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        switch (name) {
            case 'username':
            case 'courseName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only letters and spaces are allowed.' });
                }
                break;
            case 'contactNumber':
                if (/^\d{0,10}$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Must be a 10-digit number.' });
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Email is not valid.' });
                }
                break;
            default:
                break;
        }
    };

    const handleKeyPress = (e, field) => {
        const char = String.fromCharCode(e.which);
        switch (field) {
            case 'username':
            case 'courseName':
                if (!/^[A-Za-z\s]$/.test(char)) {
                    e.preventDefault();
                    setErrors({ ...errors, [field]: 'Only letters and spaces are allowed.' });
                }
                break;
            case 'contactNumber':
                if (!/^\d$/.test(char) || formValues.contactNumber.length >= 10) {
                    e.preventDefault();
                    setErrors({ ...errors, contactNumber: 'Must be a 10-digit number.' });
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues);
        axios.post('http://localhost:3000/api/student-profile', formValues)
            .then(res => {
                console.log(res);
                setSnackbar({
                    open: true,
                    message: 'Course added successfully!',
                    severity: 'success',
                });
            })
            .catch(err => {
                setSnackbar({
                    open: true,
                    message: 'Failed to add course.',
                    severity: 'error',
                });
            });
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <div>
            <Student_head />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%', fontSize: '20px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <div className='std-prof-main-big-rect'>
                <div className='std-prof-big-rect'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className='std-prof-top-head'>Welcome To Your Profile!</h2>
                        </div>
                        <div className='std-prof-sub-sub-rect'></div>
                        <div className='std-prof-sub-big-rect'>

                            <div className='std-prof-sub-small-rect1'>
                                <div>
                                    <h2 className='std-prof-head-txt1'>User Name</h2>
                                </div>
                                <div className='std-prof-txt-field'>
                                    <Box
                                        component="form"
                                        sx={{
                                            marginTop: -1,
                                            backgroundColor: 'rgb(188, 187, 187)',
                                            borderRadius: 2,
                                            '& > :not(style)': { m: 1, width: '97%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="username"
                                            label="User name"
                                            variant="standard"
                                            name="username"
                                            value={formValues.username}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'username')}
                                            error={Boolean(errors.username)}
                                            helperText={errors.username}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='std-prof-head-txt2'>Email</h2>
                                </div>
                                <div className='std-prof-txt-field'>
                                    <Box
                                        component="form"
                                        sx={{
                                            marginTop: -1,
                                            backgroundColor: 'rgb(188, 187, 187)',
                                            borderRadius: 2,
                                            '& > :not(style)': { m: 1, width: '97%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="email"
                                            label="Email address"
                                            variant="standard"
                                            name="email"
                                            value={formValues.email}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'email')}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='std-prof-head-txt2'>Contact Number</h2>
                                </div>
                                <div className='std-prof-txt-field'>
                                    <Box
                                        component="form"
                                        sx={{
                                            marginTop: -1,
                                            backgroundColor: 'rgb(188, 187, 187)',
                                            borderRadius: 2,
                                            '& > :not(style)': { m: 1, width: '97%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="contactNumber"
                                            label="Contact number"
                                            variant="standard"
                                            name="contactNumber"
                                            value={formValues.contactNumber}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'contactNumber')}
                                            error={Boolean(errors.contactNumber)}
                                            helperText={errors.contactNumber}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='std-prof-head-txt2'>Course Name</h2>
                                </div>
                                <div className='std-prof-txt-field'>
                                    <Box
                                        component="form"
                                        sx={{
                                            marginTop: -1,
                                            backgroundColor: 'rgb(188, 187, 187)',
                                            borderRadius: 2,
                                            '& > :not(style)': { m: 1, width: '97%' },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <TextField
                                            id="courseName"
                                            label="Course name"
                                            variant="standard"
                                            name="courseName"
                                            value={formValues.courseName}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'courseName')}
                                            error={Boolean(errors.courseName)}
                                            helperText={errors.courseName}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className='std-prof-sub-small-rect2'>
                                <div>
                                    <h2 className='std-prof-head-txt'>Profile Photo</h2>
                                </div>
                                <div className='std-prof-photo'></div>
                                <div className='std-edit-edit-btn'>
                                    <Stack direction="row" spacing={2} width={80}>
                                        <Button variant="contained" startIcon={<EditIcon />} style={{ width: '100%', backgroundColor: 'rgb(0, 0, 79)', color: 'white', fontSize: '14px' }}>
                                            Edit
                                        </Button>
                                    </Stack>
                                </div>
                            </div>

                        </div>
                        <div className='std-update-update-btn'>
                            <Stack direction="row" spacing={2} width={190}>
                                <Button
                                    type='submit'
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    style={{ width: '100%', backgroundColor: 'rgb(0, 0, 79)', color: 'white', fontSize: '14px' }}
                                >
                                    Update Profile
                                </Button>
                            </Stack>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default profile1;
