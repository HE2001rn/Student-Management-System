import React, { useState, useEffect } from 'react';
import './list1.css';
import Head from '../../Component/Head/head';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const List1 = () => {
    const [teachers, setTeachers] = useState([]);
    const [openDetails, setOpenDetails] = useState({});

    useEffect(() => {
        // Fetch teachers from the backend
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/teachers');
                setTeachers(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        fetchTeachers();
    }, []);

    const handleOpenDetails = (rowId) => {
        setOpenDetails({ ...openDetails, [rowId]: !openDetails[rowId] });
    };

    return (
        <div>
            <Head />
            <div className='big-rect5'>
                <div>
                    <h2 className='top-head5'>Welcome To Lectures List!</h2>
                </div>
                <div className='search-rect5'>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Enter Lecturer ID…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>
                <div className='std-table-rect5'>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Lecturer ID</StyledTableCell>
                                    <StyledTableCell align="center">Lecturer Name</StyledTableCell>
                                    <StyledTableCell align="center">Module</StyledTableCell>
                                    <StyledTableCell align="center">Other Info</StyledTableCell>
                                    <StyledTableCell align="center">Contact Number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {teachers.map((teacher) => (
                                    <React.Fragment key={teacher.LecturerID}>
                                        <StyledTableRow>
                                            <StyledTableCell align="center">{teacher.LecturerID}</StyledTableCell>
                                            <StyledTableCell align="center">{teacher.LecturerName}</StyledTableCell>
                                            <StyledTableCell align="center">{teacher.Module}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                                    onClick={() => handleOpenDetails(teacher.LecturerID)}
                                                >
                                                    {openDetails[teacher.LecturerID] ? 'Hide Details' : 'View'}
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{teacher.ContactNumber}</StyledTableCell>
                                        </StyledTableRow>
                                        {openDetails[teacher.LecturerID] && (
                                            <TableRow>
                                                <StyledTableCell colSpan={5}>
                                                    <p>{teacher.OtherInfo}</p>
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

export default List1;
