
import React from 'react';
import { Box, Grid, Container, Typography, Divider, Button } from '@mui/material';
import Page from '../../components/Page';
import { UpcomingTest,TestMissed,OngoingTest,AppNewsUpdate,TodayTest, UpcomingTestTable, SubmittedTestTable  } from '../../components/student/main';
import Navbar from '../../components/student/navbar/Navbar';
import { useHistory } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { StudentTestDetails } from '../../redux/actions/student/studentTest';




export default function DashboardApp() {
    const history = useHistory();
    const dispatch = useDispatch();

    const studentTest = useSelector((state) => state?.studentTestDetails);

    React.useEffect(() => {
        dispatch(StudentTestDetails());
    }, [])

    React.useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(StudentTestDetails());
        }, 60000)

        return (() => {
            clearInterval(timer);
        })
        
    }, [])



    return (
    <Page title="Examify | Home">
        <Navbar isHome={false}/>
        <Container maxWidth="xl">
            <Box sx={{ pt: 15, pb: 5}}>
                <Typography variant="h4">Welcome to Examify</Typography>
            </Box>

            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={3}>
                    <OngoingTest total={studentTest.on}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TodayTest total={studentTest.todayTest.length}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <UpcomingTest total={studentTest.upcomingTest.length}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <TestMissed total={studentTest.missedTest}/>
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ pt: 5, pb: 2}}>
                        <Typography variant="h4">Ongoing Test</Typography>
                    </Box>

                    {studentTest.ongoingTest.length == 0 && 
                        <Box sx={{ pt: 3, pb: 2, mr:'auto', ml:'auto'}}>
                            <Typography  align="center" variant="h5">No Ongoing Test</Typography>
                            <Divider />
                        </Box>
                    }

                    {studentTest.ongoingTest.map((data, index) => (
                        <Box>
                            {data.status && 
                                <AppNewsUpdate
                                data = {data}
                                index = {index}
                                isbtn = {true}
                            />
                            }
                            
                        </Box>
                    ))}

                </Grid>
                
                {studentTest.todayTest.length > 0 && 
                    <Grid item xs={12} md={12} lg={12}>

                    <Box sx={{ pt: 5, pb: 2}}>
                        <Typography variant="h4">Today Test</Typography>
                    </Box>
                    
                    {studentTest.todayTest.map((data, index) => (
                        <AppNewsUpdate
                        data = {data}
                        index = {index}
                        isbtn = {false}
                        />
                    ))}

                </Grid>
                }

                <Container>
                <Grid item xs={12} md={12} lg={12}>
                        <UpcomingTestTable isMain={true}/>
                        {studentTest.upcomingTest?.length > 0 &&
                            <Box sx={{mt:5,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Button variant="contained" size="large" onClick = {() => history.push('/StudentUpcomingTest')}>Show More</Button>
                            </Box>
                        }
                </Grid>


                <Grid item xs={12} md={12} lg={12}>
                    <SubmittedTestTable isMain={true}/>
                    {studentTest.testSubmitted.length > 0 && 
                        <Box sx={{mt:5,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <Button sx={{mb: 10}} variant="contained" size="large"  onClick = {() => history.push('/StudentSubmittedTest')}>
                                Show More
                            </Button>
                        </Box>
                    }
                </Grid>
                </Container>
                
        </Grid>
        </Container>
    </Page>
  );
}
