import React, { useState } from 'react';
import './stdsicklv.css';
import Student_head from '../../Component/Student_head/sthead';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import UploadIcon from '@mui/icons-material/UploadFile';
import SaveIcon from '@mui/icons-material/send';
import axios from 'axios';

const stdsicklv = () => {
    const [formValues, setFormValues] = useState({
        studentId: '',
        studentName: '',
        courseName: '',
        departmentHead: '',
        leaveDuration: '',
        document: null,
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const handleFileChange = (e) => {
        setFormValues({ ...formValues, document: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('studentId', formValues.studentId);
        formData.append('studentName', formValues.studentName);
        formData.append('courseName', formValues.courseName);
        formData.append('departmentHead', formValues.departmentHead);
        formData.append('leaveDuration', formValues.leaveDuration);
        formData.append('document', formValues.document);

        try {
            await axios.post('http://localhost:5000/api/stdsick/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Sick leave applied successfully.');
        } catch (error) {
            console.error('Error applying sick leave:', error);
            alert('An error occurred while applying for sick leave.');
        }
    };

    return (
        <div>
            <Student_head />
            <div className='stdsicklv-big-rect1'>
                <div>
                    <h2 className='stdsicklv-top-head1'>Apply Sick Leave</h2>
                </div>
                <div className='stdsicklv-big-main-rect1'>
                    <div className='stdsicklv-sub-main-rect1'>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Student ID:</h2>
                            </div>
                            <div className='stdsicklv-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="studentId" label="Your student ID" variant="filled" sx={{ flexGrow: 1, mr: 1 }} onChange={handleInputChange} />
                                </Box>
                            </div>
                        </div>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Student Name:</h2>
                            </div>
                            <div className='stdsicklv-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="studentName" label="Your Name" variant="filled" sx={{ flexGrow: 1, mr: 1 }} onChange={handleInputChange} />
                                </Box>
                            </div>
                        </div>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Course Name:</h2>
                            </div>
                            <div className='stdsicklv-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="courseName" label="Your course name" variant="filled" sx={{ flexGrow: 1, mr: 1 }} onChange={handleInputChange} />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='stdsicklv-sub-main-rect2'>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Head Of Department:</h2>
                            </div>
                            <div className='stdsicklv-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="departmentHead" label="Your department head name" variant="filled" sx={{ flexGrow: 1, mr: 1 }} onChange={handleInputChange} />
                                </Box>
                            </div>
                        </div>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Leave Duration:</h2>
                            </div>
                            <div className='stdsicklv-first-txt-rec'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '30ch', borderRadius: 20 },
                                        display: 'flex',
                                        alignItems: 'end',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="leaveDuration" label="Leave duration" variant="filled" sx={{ flexGrow: 1, mr: 1 }} onChange={handleInputChange} />
                                </Box>
                            </div>
                        </div>
                        <div className='stdsicklv-main-txt-rec'>
                            <div>
                                <h2 className='stdsicklv-rect-topic'>Upload Document:</h2>
                            </div>
                            <div className='stdsicklv-first-upload-rec'>
                                <Stack direction="row" spacing={4}>
                                    <Button variant="contained" component="label" endIcon={<UploadIcon />} className='edit-btn-min' style={{ width: '100%', height: '55px', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}>
                                        Upload Document
                                        <input type="file" hidden onChange={handleFileChange} />
                                    </Button>
                                </Stack>
                            </div>
                        </div>
                    </div>
                    <div className='stdsicklv-send-btn'>
                        <Stack direction="row" spacing={4}>
                            <Button variant="contained" endIcon={<SaveIcon />} className='edit-btn-min' style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }} onClick={handleSubmit}>
                                Send
                            </Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default stdsicklv;
