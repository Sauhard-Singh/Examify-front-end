import React from 'react';
import { Box, Grid, Container, Typography, Stack, Divider, Button } from '@mui/material';
import Page from '../../components/Page';
import { UpcomingTest,TestSubmiited,TodayTest,TestMissed,AppNewsUpdate ,UpcomingTestTable, SubmittedTestTable  } from '../../components/teacher';
import { useHistory } from 'react-router-dom';
import studentMain from '../../_mocks_/teacherMain';
import Navbar from '../../components/student/navbar/Navbar';
import { TeacherTestDetails } from '../../redux/actions/teacher/teacherTest';
import { useDispatch ,useSelector } from 'react-redux';


export default function DashboardApp() {

    const dispatch = useDispatch();
    const teacherTest = useSelector((state)=> state.teacherTestDetails);
    React.useEffect(() => {
        dispatch(TeacherTestDetails());
    }, []);

    const history = useHistory();
    const [todayTest] =  React.useState(studentMain.ongoingTest);
    const arr = Array.from(Array(5).keys());

    return (
    <Page title="Examify | Home">
        <Navbar isHome={false}/>
        <Container maxWidth="xl">
            <Box sx={{ pt: 15, pb: 5}}>
                <Typography variant="h4">Welcome to Examify</Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <TestMissed total={teacherTest.ongoingTest.length}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TodayTest total={teacherTest.todayTest.length}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <UpcomingTest total={teacherTest.upcomingTest.length}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TestSubmiited total={teacherTest.historyTest.length}/>
                </Grid>

                <Box sx={{mx:5,mt:5}}>
                    <Button variant="contained" size="large" onClick = {() => history.push('/AddTest')}>Create Test</Button>
                </Box>

                {teacherTest.ongoingTest.length > 0 && 
                    <Grid item xs={12} md={12} lg={12}>

                    <Box sx={{ pt: 5, pb: 2}}>
                        <Typography variant="h4">Ongoing Test</Typography>
                    </Box>
                    
                    {teacherTest.ongoingTest.map((data, index) => (
                        <AppNewsUpdate
                        data = {data}
                        index = {index}
                        />
                    ))}

                </Grid>
                }

                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ pt: 5, pb: 2}}>
                        <Typography variant="h4">Today's Test</Typography>
                    </Box>
                    {teacherTest.todayTest.length == 0 && 
                        <Box sx={{ pt: 3, pb: 2, mr:'auto', ml:'auto'}}>
                            <Typography  align="center" variant="h5">No Test today</Typography>
                            <Divider />
                        </Box>
                    }
                    {teacherTest.todayTest.map((data,index) => (
                        <AppNewsUpdate 
                        data = {data}
                        index = {index}
                        isbtn = {true}
                        />
                    ))}
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                        <UpcomingTestTable isMain={true}/>
                        {teacherTest.upcomingTest?.length > 0 &&
                            <Box sx={{mt:5,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button variant="contained" size="large" onClick = {() => history.push('/TeacherUpcomingTest')}>Show More</Button>
                            </Box>
                        }
                </Grid>


                <Grid item xs={12} md={12} lg={12}>
                    <SubmittedTestTable isMain={true}/>
                    {teacherTest.historyTest?.length > 0 &&
                        <Box sx={{mt:5,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button sx={{mb: 10}} variant="contained" size="large"  onClick = {() => history.push('/TeacherCompletedTest')}>Show More</Button>
                        </Box>
                    }
                </Grid>

            </Grid>
        </Container>
    </Page>
    );
}
