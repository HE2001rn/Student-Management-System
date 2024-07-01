import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signin.css';
import Sign_side from '../../Component/Sign_side/side';
import SignupImg1 from '../../assets/signupphoto.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]*\s*[A-Za-z]*$/.test(value) || value === '') {
      setUsername(value);
      setUsernameError('');
    } else {
      setUsernameError('Username can only contain letters with spaces between them.');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/^[A-Z][A-Za-z\d!@#$%^&*()_+]{0,}$/.test(value) || value === '') {
      setPassword(value);
      setPasswordError('');
    } else {
      setPasswordError('Password must start with a capital letter and be at least 8 characters long.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/signin', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;

      if (response.status === 200) {
        alert('Login successful');
        if (result.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (result.role === 'student') {
          navigate('/student-panel');
        } else {
          alert('Unknown role');
        }
      } else {
        alert(`Login failed: ${result.message}`);
      }
    } 
    catch (error) {
      if (error.response) {
        alert(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        alert('Network error: Please check your network connection or try again later.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Sign_side />
      <div className='signin-main-big-rect'>
        <div className='signin-main-photo1'>
          <img src={SignupImg1} alt="Signin" className='signin-image' />
        </div>
        <div className='signin-main-form-1'>
          <div>
            <h2 className='signin-main-topic'>Welcome to Nalanda IUHS Campus</h2>
          </div>
          <div>
            <h6 className='signin-sub-min-topic'>Sign in to your account</h6>
          </div>
          <div>
            <h3 className='signin-sub-main-topic'>Sign In</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <h6 className='txt-field-topic-in'>User Name:</h6>
              <div className='fieldsty-in'>
                <Box component="div" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <TextField
                    id="username"
                    label=""
                    variant="standard"
                    value={username}
                    onChange={handleUsernameChange}
                    fullWidth
                    error={Boolean(usernameError)}
                    helperText={<span style={{ color: 'red', fontSize: '12px' }}>{usernameError}</span>}
                  />
                </Box>
              </div>
              <div className='pass-main-text-rect-in'>
                <div className='pass-sub-text-rect-in'>
                  <h6 className='txt-field-topic1-in'>Password:</h6>
                  <div className='fieldsty-in1'>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      <FormControl variant="standard" fullWidth>
                        <InputLabel htmlFor="password"></InputLabel>
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={handlePasswordChange}
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
                          error={Boolean(passwordError)}
                        />
                      </FormControl>
                    </Box>
                    {passwordError && <span className="error-text" style={{ color: 'red', fontSize: '12px' }}>{passwordError}</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className='forgot-psw-rect-in'>
              <h6 className='forgot-psw-topic-in'>Forget Password?</h6>
            </div>
            <div className='already-reg-rect-in'>
              <h6 className='already-reg-topic-in'>Don't have an account?</h6>
              <a href='/signup' className='signup-link-txt'>Sign Up</a>
            </div>
            <div>

              <button type="submit" className='signin-main-btn'>Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
