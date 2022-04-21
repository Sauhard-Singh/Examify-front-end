
import React from 'react';
import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
import Page from '../../components/Page';
import { ResultMutipleCheck, ResultSingleCheck } from '../../components/student/main';
import resultdata from '../../_mocks_/testSubmitted';
import Navbar from '../../components/student/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { SpecificStudentResult } from '../../redux/actions/teacher/teacherTest';
import { useDispatch } from 'react-redux';

export default function Result() {
    
    const dispatch = useDispatch();
    const [result, setresult] = React.useState(null);
    const [isloading, setloading] = React.useState(true);
    const {id}= useParams();
    const findResultData = async() => {
        const data = await dispatch(SpecificStudentResult(id));
        setresult(data?.data);
        setloading(false);
    }
    React.useState(() => {
        findResultData();
    }, [id]);
    return (
    <Page title={`Test | ${result?.testId?.title}`}>
        <Navbar />
        {isloading == true && 
        <Container maxWidth="xl" sx={{pb: 15}}>
            <Box sx={{ pt: 15, pb: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography className="noselect" variant="h4">Your Result will be displayed</Typography>
                    <Typography className="noselect" variant="h4">Loading...</Typography>
            </Box>
        </Container>
        }

        {isloading == false && 
            <Container maxWidth="xl" sx={{pb: 15}}>
            <Box sx={{ pt: 15, pb: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography className="noselect" variant="h4">{result?.testId?.title}</Typography>
                    <Typography className="noselect" variant="h4">Marks: {result?.marks}/{result?.totalMarks}</Typography>
            </Box>
            
            <Grid container spacing={3} sx={{pl:5, pr:5}}>
                <Grid item xs={12} md={12} lg={12}>

                    {result?.testId.questions.map((q, i) => (
                        <Box key={i}>
                            {!q.mcqType ? 
                            <ResultSingleCheck
                                questionindex={i}
                                title={q.questionTitle}
                                marks={q.questionMarks}
                                answered={result?.answer[i]}
                                mcqQuestions= {q.options}
                            /> : 
                            
                            <ResultMutipleCheck
                                questionindex={i}
                                title={q.questionTitle}
                                marks={q.questionMarks}
                                answered={result?.answer[i]}
                                mcqQuestions= {q.options}
                            />}
                        </Box>
                    ))}

                </Grid>
            </Grid>
            </Container>
        }
    </Page>
    );
}
