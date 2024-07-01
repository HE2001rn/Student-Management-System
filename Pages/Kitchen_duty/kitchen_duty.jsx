import React, { useState } from 'react';
import './kitchen_duty.css';
import Head from '../../Component/Head/head';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';

const kitchen_duty = () => {
    const [formValues, setFormValues] = useState({
        firstStudentName: '',
        secondStudentName: '',
        thirdStudentName: '',
        fourthStudentName: '',
        fiveStudentName: '',
        firstStudentID: '',
        secondStudentID: '',
        thirdStudentID: '',
        fourthStudentID: '',
        fivethStudentID: '',
    });
    const [errors, setErrors] = useState({
        firstStudentName: '',
        secondStudentName: '',
        thirdStudentName: '',
        fourthStudentName: '',
        fiveStudentName: '',
        firstStudentID: '',
        secondStudentID: '',
        thirdStudentID: '',
        fourthStudentID: '',
        fivethStudentID: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        let error = '';

        switch (id) {
            case 'firstStudentName':
            case 'secondStudentName':
            case 'thirdStudentName':
            case 'fourthStudentName':
            case 'fivethStudentName':
                if (/^[A-Za-z\s]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only letters and spaces are allowed.';
                }
                break;
            case 'firstStudentId':
            case 'secondStudentId':
            case 'thirdStudentId':
            case 'fourthStudentId':
            case 'fivethStudentId':

                if (/^[A-Z0-9]*$/.test(value)) {
                    setFormValues({ ...formValues, [id]: value });
                } else {
                    error = 'Only numbers and capital letters without spaces are allowed.';
                }
                break;
            default:
                setFormValues({ ...formValues, [id]: value });
                break;
        }

        setErrors({ ...errors, [id]: error });
    };

    const handleSubmit = () => {
        // Add your submit logic here
        console.log(formValues);
    };

    return (
        <div>
            <Head />
            <div className='kitchen_duty-big-rect3'>
                <div>
                    <h2 className='kitchen_duty-top-head3'>Student Kitchen Duty!</h2>
                </div>
                <div className='kitchen_duty-rect3'>
                    <div>
                        <h2 className='kitchen_duty-sub-top-head3'>Add student for kitchen duty!</h2>
                    </div>
                    <div className='xs-kitchen_duty-rect3'>

                        <div className='xs-kitchen_duty-sub3'>
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
                                        id="firstStudentName"
                                        label="First Student Name"
                                        variant="standard"
                                        value={formValues.firstStudentName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.firstStudentName)}
                                        helperText={errors.firstStudentName}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="secondStudentName"
                                        label="Second Student Name"
                                        variant="standard"
                                        value={formValues.secondStudentName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.secondStudentName)}
                                        helperText={errors.secondStudentName}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="thirdStudentName"
                                        label="Third Student Name"
                                        variant="standard"
                                        value={formValues.thirdStudentName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.thirdStudentName)}
                                        helperText={errors.thirdStudentName}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="fourthStudentName"
                                        label="Fourth Student Name"
                                        variant="standard"
                                        value={formValues.fourthStudentName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.fourthStudentName)}
                                        helperText={errors.fourthStudentName}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="fiveStudentName"
                                        label="Fifth Student Name"
                                        variant="standard"
                                        value={formValues.fiveStudentName}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.fiveStudentName)}
                                        helperText={errors.fiveStudentName}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className='xs-kitchen_duty-sub3'>
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
                                        id="firstStudentID"
                                        label="First Student ID"
                                        variant="standard"
                                        value={formValues.firstStudentID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.firstStudentID)}
                                        helperText={errors.firstStudentID}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="secondStudentID"
                                        label="Second Student ID"
                                        variant="standard"
                                        value={formValues.secondStudentID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.secondStudentID)}
                                        helperText={errors.secondStudentID}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="thirdStudentID"
                                        label="Third Student ID"
                                        variant="standard"
                                        value={formValues.thirdStudentID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.thirdStudentID)}
                                        helperText={errors.thirdStudentID}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="fourthStudentID"
                                        label="Fourth Student ID"
                                        variant="standard"
                                        value={formValues.fourthStudentID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.fourthStudentID)}
                                        helperText={errors.fourthStudentID}
                                    />
                                </Box>
                            </div>
                            <div className='xs-xs-kitchen_duty-sub3'>
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
                                        id="fiveStudentID"
                                        label="Fifth Student ID"
                                        variant="standard"
                                        value={formValues.fivethStudentID}
                                        onChange={handleInputChange}
                                        error={Boolean(errors.fivethStudentID)}
                                        helperText={errors.fivethStudentID}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>

                    <div className='kitchen_duty-save-btn'>
                        <Stack direction="row" spacing={4}>
                            <Button
                                variant="contained"
                                endIcon={<SaveIcon />}
                                className='edit-btn-min'
                                style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </Stack>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default kitchen_duty;
