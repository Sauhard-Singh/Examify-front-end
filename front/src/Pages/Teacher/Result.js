import { filter } from 'lodash';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
   Card, Table, Stack, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer,Box
} from '@mui/material';
import Page from '../../components/Page';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../../components/teacher/tablecomponent';
import Navbar from '../../components/student/navbar/Navbar';
import USERLIST from '../../_mocks_/user';
import { useParams } from 'react-router-dom';
import { TeacherSpecificTest } from '../../redux/actions/teacher/teacherTest';
import { useDispatch } from 'react-redux';


const TABLE_HEAD = [
   { id: 'name', label: 'Name', alignRight: false },
   { id: 'branch', label: 'Branch', alignRight: false },
   { id: 'section', label: 'Section', alignRight: false },
   { id: 'marks', label: 'Marks', alignRight: false },
   { id: 'totalMarks', label: 'Total Marks', alignRight: false },
   { id: 'viewTest', label: 'View Test', alignRight: false },
];

// ----------------------------------------------------------------------

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
   const stabilizedThis = array?.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
   });
   if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
   }
   return stabilizedThis.map((el) => el[0]);
}

export default function User() {
   const history = useHistory();
   const dispatch = useDispatch();

   const [testResults, setTestResults] = useState([]);
   const [order, setOrder] = useState('asc');
   const [orderBy, setOrderBy] = useState('name');
   const [filterName, setFilterName] = useState('');
   const [isloading, setloading] = useState(true);
   const { id } = useParams();

   const findResultData = async () => {
      const data = await dispatch(TeacherSpecificTest(id));
      setTestResults(data.data.result);
      setloading(false);
   }

   useState(() => {
      findResultData();
   }, [id]);

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleFilterByName = (event) => {
      setFilterName(event.target.value);
   };

   const filteredUsers = applySortFilter(testResults, getComparator(order, orderBy), filterName);

   const isUserNotFound = filteredUsers.length === 0;


   return (
      <Page title="Examify | Results">
         <Navbar />
         {isloading == true &&
            <Container maxWidth="xl" sx={{ pb: 15 }}>
               <Box sx={{ pt: 15, pb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography className="noselect" variant="h4">Your Result will be displayed</Typography>
                  <Typography className="noselect" variant="h4">Loading...</Typography>
               </Box>
            </Container>
         }
         {isloading == false &&
         <Container maxWidth="xl" sx={{ mt: 15 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} px={2}>
               <Typography variant="h4" gutterBottom>
                  TEST 1
               </Typography>
               {/* SEARCH */}
               <UserListToolbar
                  filterName={filterName}
                  onFilterName={handleFilterByName}
               />
            </Stack>

            <Card>
               <TableContainer sx={{ minWidth: 800, pb: 5 }}>
                  <Table >
                     <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD}
                        onRequestSort={handleRequestSort}
                     />
                     <TableBody>
                        {filteredUsers.map((row) => {
                           return (
                              <TableRow
                                 hover
                                 key={id}
                                 tabIndex={-1}
                                 role="checkbox"
                              >
                                 <TableCell component="th" scope="row" >
                                    <Typography variant="subtitle2" noWrap>
                                       {row.studentId.name}
                                    </Typography>
                                 </TableCell>
                                 <TableCell align="left">{row.studentId.branch}</TableCell>
                                 <TableCell align="left">{row.studentId.section}</TableCell>
                                 <TableCell align="left">{row.marks}</TableCell>
                                 <TableCell align="left">{row.totalMarks}</TableCell>
                                 <TableCell align="left">
                                    <Button
                                       variant="contained"
                                       size="small"
                                       onClick={() => history.push(`/TestResult/${row._id}`)}
                                    > View</Button>
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
            </Card>
         </Container>
         }
      </Page>
   );
}