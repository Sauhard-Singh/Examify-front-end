import { filter } from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Stack, TableRow, TableBody, TableCell, Container, Typography, TableContainer, Box, Button} from '@mui/material';

import Page from '../../Page';
import SearchNotFound from '../../SearchNotFound';
import { UserListHead, UserListToolbar } from '../tablecomponent';
import Navbar from '../navbar/Navbar';
import { useSelector } from 'react-redux';

const TABLE_HEAD = [
    { id: 'name', label: 'Test Name', alignRight: false },
    { id: 'testStart', label: 'Start Date', alignRight: false },
    { id: 'marks', label: 'Marks', alignRight: false },
    { id: 'totalmarks', label: 'Total Marks', alignRight: false },
    { id: 'viewTest', label: 'View Test', alignRight: false },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function User({isMain}) {

    const history = useHistory();
    const studentTest = useSelector((state) => state?.studentTestDetails?.testSubmitted);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const filteredUsers = applySortFilter(studentTest, getComparator(order, orderBy), filterName);
    const isUserNotFound = filteredUsers.length === 0;

    const changetimstamptoDate = (timestamp) => {
    var date = new Date(timestamp*1000);

    return(date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());
    }

    return (
        <Page title="Examify | submitted Test">
            <Navbar />
            <Container maxWidth="xl" sx={{mt: 15}}>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} px={2}>
                    <Typography variant="h4" gutterBottom>
                        SUBMITTED TEST
                    </Typography>
                        {/* SEARCH */}
                    <UserListToolbar
                        placeholder = "Search Test Name..."
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                    />
                </Stack>

                <Box>
                    <TableContainer sx={{ minWidth: 800 ,pb:5}}>
                        <Table >
                            <UserListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onRequestSort={handleRequestSort}
                            />

                            <TableBody>
                            
                            {isMain == true && filteredUsers.slice(0, 5).map((row, index) => {
                                
                                return (
                                    <TableRow
                                    hover
                                    key={index}
                                    tabIndex={-1}
                                    role="checkbox"
                                    >
                                    <TableCell component="th" scope="row" >
                                            <Typography variant="subtitle2" noWrap>{row.title}</Typography>
                                        </TableCell>
                                        <TableCell align="left">{changetimstamptoDate(row.startTime)}</TableCell>
                                        <TableCell align="left">{row.marks}</TableCell>
                                        <TableCell align="left">{row.totalMarks}</TableCell>
                                        <TableCell align="left">
                                        <Button
                                        variant="contained"
                                        size="small"
                                        disabled = {row.status}
                                        onClick = {() => history.push(`/StudentResult/${row.testSubmitId}`)}
                                        > 
                                            View
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                );
                            })}
                            
                            {isMain == false && filteredUsers.map((row, index) => {
                                return (
                                    <TableRow
                                    hover
                                    key={index}
                                    tabIndex={-1}
                                    role="checkbox"
                                    >
                                    <TableCell component="th" scope="row" >
                                            <Typography variant="subtitle2" noWrap>{row.title}</Typography>
                                        </TableCell>
                                        <TableCell align="left">{changetimstamptoDate(row.startTime)}</TableCell>
                                        <TableCell align="left">{row.marks}</TableCell>
                                        <TableCell align="left">{row.totalMarks}</TableCell>
                                        <TableCell align="left">
                                        <Button
                                        variant="contained"
                                        size="small"
                                        disabled = {row.status}
                                        onClick = {() => history.push(`/StudentResult/${row.testSubmitId}`)}
                                        > 
                                            View
                                        </Button>
                                    </TableCell>
                                    </TableRow>
                                );
                            })}

                            </TableBody>
                            {isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={5} sx={{ py: 1 }}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </Page>
    );
}