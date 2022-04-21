
import React from 'react';
import { Box, Grid, Container, Typography,  Button, Divider } from '@mui/material';
import Page from '../../components/Page';
import { MutipleCheck, SingleCheck } from '../../components/student/main';
import { useHistory, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { StudentAnswer, studentTest, submitTestAction } from '../../redux/actions/student/studentTest';

export default function DashboardApp() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const answers = useSelector((state) => state?.studentTestAnswer?.answer);
    const [test, settest] = React.useState(null);
    const [isloading, setLoading] = React.useState(true);
    const [timeRemaining, settimeRemaining] = React.useState(0);


    React.useEffect(() => {
        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
    
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);

    const getTestDetails = async() => {
        const data = await dispatch(studentTest(id, history));
        if(data){
            settest(data?.data?.test);
            dispatch(StudentAnswer(data?.data?.test, history));
            
            const nowTimeStamp = new Date().getTime()/1000; 
            const endTime = data?.data?.test?.endTime;
            const duration = Math.round((endTime - nowTimeStamp)/60);
            settimeRemaining(duration);
            
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getTestDetails();
    }, [id]);

    const SubmitTest = () => {
        const date = new Date();
        const submitTime = date.getTime();

        const formData = { testId: id, submitTime: submitTime, endTime: test.endTime, answer: answers , totalMarks: test.totalMarks }
        dispatch(submitTestAction(formData, history));
    }


    React.useEffect(() => {
        var timer;

        if(isloading == false){
            console.log('time interval set')
            timer = setInterval(() =>{
                settimeRemaining((prev) => {
                    if(prev - 1 <= 0){
                        SubmitTest();
                    }
                    return prev-1;
                });
            }, 60000)
        }

        return (() => {
            if(isloading == false){
                clearInterval(timer);
            }
        })
    }, [isloading])


    

return (
    <Page title={`Test | Student`}>
        {isloading == true && 
        <Container maxWidth="xl" sx={{pb: 15}}>
            <Box sx={{ pt: 15, pb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography className="noselect" variant="h4">Test is Loading Pls Wait</Typography>
                    <Typography className="noselect" variant="h4">Loading...</Typography>
            </Box>
        </Container>
        }
        {isloading == false && 
            <Container maxWidth="xl" sx={{pb: 15}}>
            <Box sx={{ pt: 15, pb: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <Box>
                    <Typography className="noselect" variant="h4">{test?.title}</Typography>
                    <Typography className="noselect" variant="h4">Total Marks: {test?.totalMarks} mins</Typography>
                </Box>
                <Typography className="noselect" variant="h4">Time Remaining : {timeRemaining}</Typography>
            </Box>

            <Divider />
            
            <Grid container spacing={3} sx={{pl:5, pr:5}}>
                <Grid item xs={12} md={12} lg={12}>

                    {test?.questions.map((q, i) => (
                        <Box key={i}>
                            {!q.mcqType ? 
                            <SingleCheck
                                questionindex={i}
                                title={q.questionTitle}
                                marks={q.questionMarks}
                                mcqQuestions= {q.options}
                                disabled={false}
                            /> : 
                            
                            <MutipleCheck
                                questionindex={i}
                                title={q.questionTitle}
                                marks={q.questionMarks}
                                mcqQuestions= {q.options}
                                disabled={false}
                            />}
                        </Box>
                    ))}

                </Grid>
        </Grid>
        
        <Box sx={{mt:10,display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <Button variant="contained" size="large" onClick= {() => SubmitTest()}> Submit test </Button>
        </Box>

        </Container>
        }
        
    </Page>
    );
}
