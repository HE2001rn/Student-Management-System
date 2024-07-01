import React, { useState } from 'react';
import './profile.css';
import Head from '../../Component/Head/head';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const profile = () => {
    const [formValues, setFormValues] = useState({
        userName: '',
        email: '',
        mobileNumber: '',
        position: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        userName: '',
        email: '',
        mobileNumber: '',
        position: '',
        password: '',
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });

        switch (name) {
            case 'userName':
            case 'position':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setErrors({ ...errors, [name]: '' });
                } else {
                    setErrors({ ...errors, [name]: 'Only letters and spaces are allowed.' });
                }
                break;
            case 'mobileNumber':
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
            case 'password':
                setErrors({ ...errors, [name]: '' });
                if (!/^[A-Z]/.test(value)) {
                    setErrors({ ...errors, [name]: 'Password must start with a capital letter.' });
                } else if (value.length < 8) {
                    setErrors({ ...errors, [name]: 'Password must be at least 8 characters long.' });
                }
                break;
            default:
                break;
        }

    };

    const handleKeyPress = (e, field) => {
        const char = String.fromCharCode(e.which);
        switch (field) {
          case 'userName':
          case 'position':
            if (!/^[A-Za-z\s]$/.test(char)) {
              e.preventDefault();
              setErrors({ ...errors, [field]: 'Only letters and spaces are allowed.' });
            }
            break;
          case 'mobileNumber':
            if (!/^\d$/.test(char) || values.mobileNumber.length >= 10) {
              e.preventDefault();
              setErrors({ ...errors, mobileNumber: 'Must be a 10-digit number.' });
            }
            break;
          default:
            break;
        }
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/user-profile', formValues)
            .then(res => {
                setSnackbar({
                    open: true,
                    message: 'Details sent successfully!',
                    severity: 'success'
                });
            })
            .catch(err => {
                console.error(err); // Add this line for better error handling
                setSnackbar({
                    open: true,
                    message: 'Failed to send details.',
                    severity: 'error'
                });
            });
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false });
    };


    return (
        <div>
            <Head />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%', fontSize: '20px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <div className='user-prof-main-big-rect'>
                <div className='user-prof-big-rect'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h2 className='user-prof-top-head'>Welcome To Your Profile!</h2>
                        </div>
                        <div className='user-prof-sub-sub-rect'></div>
                        <div className='user-prof-sub-big-rect'>
                            <div className='user-prof-sub-small-rect1'>
                                <div>
                                    <h2 className='user-prof-head-txt1'>User Name</h2>
                                </div>
                                <div className='user-prof-txt-field'>
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
                                            id="userName"
                                            label="User Name"
                                            variant="standard"
                                            name="userName"
                                            value={formValues.userName}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'userName')}
                                            error={Boolean(errors.userName)}
                                            helperText={errors.userName}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='user-prof-head-txt2'>Email</h2>
                                </div>
                                <div className='user-prof-txt-field'>
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
                                            label="Email"
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
                                    <h2 className='user-prof-head-txt2'>Mobile Number</h2>
                                </div>
                                <div className='user-prof-txt-field'>
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
                                            id="mobileNumber"
                                            label="Mobile Number"
                                            variant="standard"
                                            name="mobileNumber"
                                            value={formValues.mobileNumber}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'mobileNumber')}
                                            error={Boolean(errors.mobileNumber)}
                                            helperText={errors.mobileNumber}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='user-prof-head-txt2'>Position</h2>
                                </div>
                                <div className='user-prof-txt-field'>
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
                                            id="position"
                                            label="Position"
                                            variant="standard"
                                            name="position"
                                            value={formValues.position}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'position')}
                                            error={Boolean(errors.position)}
                                            helperText={errors.position}
                                        />
                                    </Box>
                                </div>
                                <div>
                                    <h2 className='user-prof-head-txt2'>Password</h2>
                                </div>
                                <div className='user-prof-txt-field'>
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
                                            id="password"
                                            label="Password"
                                            variant="standard"
                                            type="password"
                                            name="password"
                                            value={formValues.password}
                                            onChange={handleInputChange}
                                            onKeyPress={(e) => handleKeyPress(e, 'password')}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password}
                                        />
                                    </Box>
                                </div>
                            </div>
                            <div className='user-prof-sub-small-rect2'>
                                <div>
                                    <h2 className='user-prof-head-txt'>Profile Photo</h2>
                                </div>
                                <div className='user-prof-photo'></div>
                                <div className='edit-edit-btn'>
                                    <Stack direction="row" spacing={2} width={80}>
                                        <Button variant="contained" startIcon={<EditIcon />} style={{ width: '100%', backgroundColor: 'rgb(0, 0, 79)', color: 'white', fontSize: '14px' }}>
                                            Edit
                                        </Button>
                                    </Stack>
                                </div>
                            </div>
                        </div>
                        <div className='update-update-btn'>
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
    );
}

export default profile;
