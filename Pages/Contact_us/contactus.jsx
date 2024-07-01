import React, { useState } from 'react';
import './contactus.css';
import Homepage_head from '../../Component/Homepage_head/homepage';
import Homepage_footer from '../../Component/Homepage_footer/footer';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/send';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar'; 
import Alert from '@mui/material/Alert';

const ContactUs = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    help: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: ''
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (/^[A-Za-z\s]*$/.test(value)) {
          setErrors({ ...errors, [name]: '' });
        } else {
          setErrors({ ...errors, [name]: 'Only letters and spaces are allowed.' });
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
      case 'contactNumber':
        if (/^\d*$/.test(value) && value.length <= 10) {
          setErrors({ ...errors, [name]: '' });
        } else {
          setErrors({ ...errors, [name]: 'Contact number must be 10 digits.' });
        }
        break;
      default:
        break;
    }
  };
  const handleKeyPress = (e, field) => {
    const char = String.fromCharCode(e.which);
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!/^[A-Za-z\s]$/.test(char)) {
          e.preventDefault();
          setErrors({ ...errors, [field]: 'Only letters and spaces are allowed.' });
        }
        break;
      case 'contactNumber':
        if (!/^\d$/.test(char) || values.contactNumber.length >= 10) {
          e.preventDefault();
          setErrors({ ...errors, contactNumber: 'Contact number must be 10 digits.' });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    axios.post('http://localhost:3000/api/contact-us', values)
      .then(res => {
        console.log(res);
        setSnackbar({
          open: true,
          message: 'Details sent successfully!',
          severity: 'success'
        });
      })
      .catch(err => {
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
      <Homepage_head />
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%', fontSize: '20px'  }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className='contactus-main-big-big-rect'>
        <div className='contactus-main-big-rect'>
          <div className='contactus-middle-txt-rect'>
            <div className='cnt-top-main-txt-rect'>
              <h1 className='cnt-top-main-txt1'>We are here to provide</h1>
              <h1 className='cnt-top-main-txt2'>24x7 Support</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='first-top-txt-rect'>
                <div className='first-top-txt1'>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="firstName"
                      label="First Name"
                      variant="standard"
                      name='firstName'
                      value={values.firstName}
                      onChange={handleChange}
                      onKeyPress={(e) => handleKeyPress(e, 'firstName')}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.firstName}</span>}
                    />
                  </Box>
                </div>
                <div className='first-top-txt2'>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="lastName"
                      label="Last Name"
                      variant="standard"
                      name='lastName'
                      value={values.lastName}
                      onChange={handleChange}
                      onKeyPress={(e) => handleKeyPress(e, 'lastName')}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName && <span style={{ color: 'red', fontSize: '12px' }}>{errors.lastName}</span>}
                    />
                  </Box>
                </div>
              </div>
              <div className='first-top-txt-rect'>
                <div className='first-top-txt1'>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="email"
                      label="E-mail"
                      variant="standard"
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
                    />
                  </Box>
                </div>
                <div className='first-top-txt2'>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '50ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="contactNumber"
                      label="Contact Number"
                      variant="standard"
                      name='contactNumber'
                      value={values.contactNumber}
                      onChange={handleChange}
                      onKeyPress={(e) => handleKeyPress(e, 'contactNumber')}
                      error={Boolean(errors.contactNumber)}
                      helperText={errors.contactNumber && <span style={{ color: 'red', fontSize: '12px' }}>{errors.contactNumber}</span>}
                    />
                  </Box>
                </div>
              </div>
              <div className='second-top-txt-rect'>
                <div className='second-top-txt1'>
                  <Box
                    sx={{
                      '& > :not(style)': { m: 1, width: '116.5ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="help"
                      label="How We Can Help You?"
                      variant="standard"
                      name='help'
                      value={values.help}
                      onChange={handleChange}
                    />
                  </Box>
                </div>
              </div>
              <div className='add-send-btn'>
                <Stack direction="row" spacing={4}>
                  <Button type="submit" variant="contained" endIcon={<SaveIcon />} className='edit-btn-min' style={{ width: '70%', backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}>
                    Send
                  </Button>
                </Stack>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Homepage_footer />
    </div>
  );
}

export default ContactUs;
