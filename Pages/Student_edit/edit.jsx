// Edit.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './edit.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';

const Edit = ({ studentId }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        age: '',
        courseName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        password: '',
        admissionId: '', // Add admissionId to formValues
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        age: '',
        courseName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        password: '',
        admissionId: '', // Add admissionId to errors
    });

    useEffect(() => {
        if (studentId) {
            fetchStudentData(studentId);
        }
    }, [studentId]);

    const fetchStudentData = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/${id}`);
            setFormValues(response.data);
        } catch (error) {
            console.error('Error fetching student data:', error);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';


        switch (id) {
            case 'firstName':
            case 'lastName':
            case 'courseName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only letters and spaces are allowed.';
                }
                break;
            case 'age':
                if (/^\d*$/.test(value) && value.length <= 2) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only 2-digit numbers are allowed.';
                }
                break;
            case 'admissionId':
                if (/^[A-Z0-9]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only numbers and capital letters without spaces are allowed.';
                }
                break;
            case 'phoneNumber':
                if (/^\d*$/.test(value) && value.length <= 10) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Must be a 10-digit number.';
                }
                break;
            case 'email':
                setFormValues({ ...formValues, [id]: value });

                if (value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Invalid email format.';
                }
                break;
            case 'password':
                setFormValues({ ...formValues, [id]: value });
                if (!/^[A-Z]/.test(value)) {
                    error = 'Password must start with a capital letter.';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters long.';
                }
                break;
            default:
                setFormValues({ ...formValues, [id]: value });
                break;
        }

        setErrors({ ...errors, [id]: error });
        setFormValues({ ...formValues, [id]: value });
    };

    const handleGenderChange = (e) => {
        const value = e.target.value;
        if (value === 'male' || value === 'female') {
            setFormValues({ ...formValues, gender: value });
            setErrors({ ...errors, gender: '' });
        } else {
            setErrors({ ...errors, gender: 'Please select either male or female.' });
        }
    };

    const handleSubmit = (studentId) => {
        const requestBody = {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            gender: formValues.gender,
            age: formValues.age,
            email: formValues.email,
            phoneNumber: formValues.phoneNumber,
            courseName: formValues.courseName,
            password: formValues.password,
        };

        axios.put(`http://localhost:5000/api/students/${studentId}`, requestBody)
            .then(response => {
                console.log('Success:', response.data);
                // Clear input fields
                setFormValues({
                    firstName: '',
                    lastName: '',
                    age: '',
                    courseName: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    password: '',
                });
                // Clear errors
                setErrors({
                    firstName: '',
                    lastName: '',
                    age: '',
                    courseName: '',
                    email: '',
                    phoneNumber: '',
                    gender: '',
                    password: '',
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <div>
            <Head />
            <div className='big-rect4'>
                <div>
                    <h2 className='top-head4'>Edit Student!</h2>
                </div>
                <div className='std-info-rect4'>
                    <div>
                        <h2 className='add-top-head4'>Student Information!</h2>
                    </div>
                    <div className='xs-add-main-info-rect4'>
                        <div className='xs-add-sub4'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="firstName"
                                        label="First Name"
                                        variant="standard"
                                        value={formValues.firstName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.firstName)}
                                        helperText={errors.firstName}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="age"
                                        label="Age"
                                        variant="standard"
                                        value={formValues.age}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.age)}
                                        helperText={errors.age}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="courseName"
                                        label="Course Name"
                                        variant="standard"
                                        value={formValues.courseName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.courseName)}
                                        helperText={errors.courseName}
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub4'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="lastName"
                                        label="Last Name"
                                        variant="standard"
                                        value={formValues.lastName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.lastName)}
                                        helperText={errors.lastName}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="standard"
                                        value={formValues.email}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="admissionId"
                                        label="Admission ID"
                                        variant="standard"
                                        value={formValues.admissionId}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.admissionId)}
                                        helperText={errors.admissionId}
                                    />
                                </Box>
                            </div>
                        </div>

                        <div className='xs-add-sub4'>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="gender"
                                        label="Gender"
                                        variant="standard"
                                        select
                                        SelectProps={{ native: true }}
                                        value={formValues.gender}
                                        onChange={handleGenderChange}
                                        error={Boolean(errors.gender)}
                                        helperText={errors.gender}
                                    >
                                        <option value=""></option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </TextField>

                                </Box>
                            </div>
                            <div>
                                <Box
                                    component="form"
                                    sx={{
                                        marginTop: 7,
                                        backgroundColor: 'rgb(188, 187, 187)',
                                        borderRadius: 4,
                                        '& > :not(style)': { m: 1, width: '90%' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="phoneNumber"
                                        label="Phone Number"
                                        variant="standard"
                                        value={formValues.phoneNumber}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.phoneNumber)}
                                        helperText={errors.phoneNumber}
                                    />
                                </Box>
                            </div>
                            <div>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div>
                                        <FormControl sx={{
                                            marginTop: 7,
                                            marginLeft: 1,
                                            backgroundColor: 'rgb(188, 187, 187)',
                                            borderRadius: 4,
                                            '& > :not(style)': { m: 1, width: '90%', height: '50px' },
                                        }} variant="standard">
                                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formValues.password}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.password)}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            {errors.password && (
                                                <Box sx={{ color: 'red', marginTop: 1 }}>
                                                    {errors.password}
                                                </Box>
                                            )}
                                        </FormControl>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='add-save-btn4'>
                        <Stack direction="row" spacing={4}>
                            <Button
                                variant="contained"
                                endIcon={<SaveIcon />}
                                className='edit-btn-min'
                                style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                onClick={() => handleSubmit(studentId)} // Pass studentId here
                            >
                                Save
                            </Button>

                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

Edit.propTypes = {
    studentId: PropTypes.string.isRequired,
};
export default Edit;
