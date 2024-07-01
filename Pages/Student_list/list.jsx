import React, { useState, useEffect } from 'react';
import './list.css';
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

const List = () => {
    const [students, setStudents] = useState([]);
    const [openDetails, setOpenDetails] = useState({});

    useEffect(() => {
        fetch('http://localhost:5000/api/students')
            .then((res) => res.json())
            .then((data) => {
                console.log('Data received:', data);
                setStudents(data);
            })
            .catch((error) => console.error('Error fetching students:', error));
    }, []);

    const handleOpenDetails = (rowId) => {
        setOpenDetails({ ...openDetails, [rowId]: !openDetails[rowId] });
    };

    return (
        <div>
            <Head />
            <div className='big-rect2'>
                <div>
                    <h2 className='top-head2'>Welcome To Student List!</h2>
                </div>
                <div className='search-rect'>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='Enter Student ID…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>
                <div className='std-table-rect'>
                    <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>ID</StyledTableCell>
                                    <StyledTableCell align='center'>Name</StyledTableCell>
                                    <StyledTableCell align='center'>Course Name</StyledTableCell>
                                    <StyledTableCell align='center'>Other Info</StyledTableCell>
                                    <StyledTableCell align='center'>Contact Number</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((row) => (
                                    <React.Fragment key={row.studentId}>
                                        <StyledTableRow>
                                            <StyledTableCell align='center'>{row.studentId}</StyledTableCell>
                                            <StyledTableCell align='center'>{row.firstName } {row.last_name}</StyledTableCell>
                                            <StyledTableCell align='center'>{row.courseName}</StyledTableCell>
                                            <StyledTableCell align='center'>
                                                <Button
                                                    variant='contained'
                                                    size='small'
                                                    sx={{ backgroundColor: 'rgb(0, 0, 79)', color: 'white' }}
                                                    onClick={() => handleOpenDetails(row.studentId)}
                                                >
                                                    {openDetails[row.studentId] ? 'Hide Details' : 'View'}
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell align='center'>{row.phoneNumber}</StyledTableCell>
                                        </StyledTableRow>
                                        {openDetails[row.studentId] && (
                                            <TableRow>
                                                <StyledTableCell colSpan={5}>
                                                    <p>{row.otherInfo}</p>
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

export default List;
