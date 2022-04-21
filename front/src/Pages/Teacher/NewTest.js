import { useState } from 'react';
import { Box, Button, Grid, Container, Typography, Stack, TextField, FormGroup, FormControlLabel, Checkbox, Autocomplete, Radio, FormControl, FormLabel, RadioGroup, MenuItem, Select, InputLabel, InputAdornment } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Page from '../../components/Page';
import { LocalizationProvider, TimePicker, DateTimePicker, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Navbar from '../../components/student/navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { TeacherAddTest } from '../../redux/actions/teacher/teacherTest';

export default function NewTest() {

    const dispatch = useDispatch();
    const history = useHistory();
    const tdate = new Date();
    const branches = useSelector((state) => state?.branch?.branch);
    const [test, setTest] = useState({ title: "", startDate: tdate, endDate: tdate, isBranchSpecific: true, branch: null, section: null, isduration: false, duration: '', totalMarks: 1 });

    const [questions, setQuestions] = useState([{ questionTitle: 'This is a Question', questionMarks: 1, mcqType: false, mcq: 'single', options: [{ option: 'This is a Option', status: true }] }]);
    const [sections, setSections] = useState(null);

    const sectionprops = {
        options: section,
        getOptionLabel: (option) => option,
    };

    const handleChangeBranch = (event) =>{
        setTest((prevState) => ({
            ...prevState,
            branch: event.target.value,
            section: null,
        }));
        branches.forEach((b) => {
			if(b.branchName === event.target.value){
				setSections(b.sections);
			}
		})
    }

    const handleSection = (event) => {
        setTest((prevState) => ({
            ...prevState,
            section: event.target.value
        }));
    }
    const mcqTypeChange = (e, i) => {
        const list = [...questions];
        if (e.target.value == 'single') {
            list[i].options.forEach(ele => ele.status = false);
            list[i].options[0].status = true;
        }

        list[i].mcq = e.target.value;
        list[i].mcqType = (e.target.value == 'single' ? false : true);
        setQuestions(list);
    }


    // TITLE , START TIME , END TIME , BRANCH , SECTIONtotalMarks
    const handleTitleChange = (e) => {
        setTest((prevState) => ({
            ...prevState,
            title: e.target.value
        }));
    }

    const handlestartDate = (newValue) => {
        setTest((prevState) => ({
            ...prevState,
            startDate: newValue
        }));
    };

    const handleendDate = (newValue) => {
        setTest((prevState) => ({
            ...prevState,
            endDate: newValue
        }));
    };

    const handlebranch = (e) => {
        const { name, checked } = e.target;
        setTest((prevState) => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleInputduration = (e) => {
        setTest((prevState) => ({
            ...prevState,
            duration: e.target.value
        }));
    }

    const handleAddClick = () => {
        setQuestions([...questions, { questionTitle: 'This is a Question', questionMarks: 1, mcq: 'single', mcqType: false, options: [{ option: 'This is a Option', status: true }] }]);
    }


    const handleSubmit = () => {
        if (!test.isBranchSpecific) test.section = "null";
        if (!test.isduration) test.duration = null;
        let total = 0;
        questions.forEach((ques,index)=>{
            total += parseInt(ques.questionMarks);
        });
        test.totalMarks = total;
        const formData = { title: test.title, startTime: (test.startDate.getTime() / 1000), endTime: (test.endDate.getTime() / 1000), branch: test.branch, isBranch: test.isBranchSpecific, totalMarks: test.totalMarks, isDuration: test.isduration, duration: parseInt(test.duration), section: test.section, questions: questions };
        dispatch(TeacherAddTest(formData, history));

    }
    // END TITLE


    const handleAddOption = (e, i) => {
        const list = [...questions];
        list[i].options.push({ option: 'This is a Option 2', status: false });
        setQuestions(list);
    }

    const handleOptionChange = (e, i, o) => {
        const list = [...questions];
        list[i].options[o].status = e.target.checked;
        setQuestions(list);
    }

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...questions];
        list[index][name] = value;
        setQuestions(list);
    }

    const handleOptionInputChange = (e, i, o) => {
        const { name, value } = e.target;
        const list = [...questions];
        list[i].options[o].option = value;
        setQuestions(list);
    }

    const handleDeleteQuestion = (i) => {
        const list = [...questions];
        list.splice(i, 1);
        setQuestions(list);
    }

    const handleDeleteOption = (e, i, o) => {
        const list = [...questions];
        list[i].options.splice(o, 1);
        setQuestions(list);
    }

    const onRadioChange = (e, i) => {
        const list = [...questions];
        const prevIndex = list[i].options.findIndex(item => item.status == true);

        if (prevIndex == e.target.value)
            return;

        list[i].options[prevIndex].status = false
        list[i].options[e.target.value].status = true;
        setQuestions(list);
    }


    return (
        <Page title="Examify | Add Question">
            <Navbar />
            <Container maxWidth="xl" >

                <Box sx={{ width: [300, 500, 700, 900], mx: "auto", mt: 10, py: 1 }}>

                    <Box >
                        <TextField variant="standard" fullWidth autoComplete="off" label="Title" onChange={e => handleTitleChange(e)}
                            value={test.title}
                            InputLabelProps={{ style: { fontSize: 36, textAlign: "center", paddingTop: '15px' } }}
                            inputProps={{ style: { fontSize: 36, height: 70, padding: '5px 20px', textAlign: "center" } }} />
                    </Box>

                    <Box sx={{ mt: 5, px: 0 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>

                                <Grid container spacing={1} justifyContent="space-between"  >
                                    <Grid item xs={12} sm={6} >
                                        <DateTimePicker label="Start Time"
                                            value={test.startDate}
                                            onChange={handlestartDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DateTimePicker label="End Time"
                                            value={test.endDate}
                                            onChange={handleendDate}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} alignItems="center" justifyContent="center" >
                                    <Grid item xs={12} md={2} >
                                        <FormGroup >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="isBranchSpecific"
                                                        checked={test.isBranchSpecific}
                                                        onChange={handlebranch}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                                label="Section"
                                            />
                                        </FormGroup>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={5}>

                                        <FormControl fullWidth variant="standard" >
                                            <InputLabel id="demo-simple-select-helper-label">Branch</InputLabel>
                                            <Select
                                                fullWidth
                                                type="branch"
                                                label="Branch"
                                                onChange={handleChangeBranch}
                                            >
                                                {branches?.map((b, index) => (<MenuItem key={index} value={b.branchName} >{b.branchName}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={5}>
                                        <FormControl fullWidth variant="standard" >
                                            <InputLabel id="demo-simple-select-helper-label">Section</InputLabel>
                                            <Select
                                                disabled={!test.isBranchSpecific}
                                                fullWidth
                                                type="section"
                                                label="Section"
                                                onChange={handleSection}
                                            >
                                                {sections?.map((section, index) => (<MenuItem key={index} value={section} >{section}</MenuItem>))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={1} alignItems="center" >
                                    <Grid item xs={12} md={2} >
                                        <FormGroup >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        name="isduration"
                                                        checked={test.isduration}
                                                        onChange={handlebranch}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                                label="Duration"
                                            />
                                        </FormGroup>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={5}>
                                        <TextField
                                            disabled={!test.isduration}
                                            name="duration"
                                            label="Duration"
                                            type="number"
                                            variant="outlined"
                                            value={test.duration}
                                            onWheel={(e) => e.target.blur()}
                                            onChange={(e) => handleInputduration(e)}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">min</InputAdornment>,
                                            }}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: "center" } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ mt: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button variant="contained" size="large" color="info" onClick={handleSubmit}>Save</Button>
                        <Button variant="contained" size="large" onClick={handleAddClick}>Add Question</Button>
                    </Box>

                </Box>

                <Box>
                    <Stack spacing={5} sx={{ my: 5, py: 5 }}>
                        {questions.map((q, i) => {
                            return (
                                <Box key={i} sx={{ p: 5 }}>
                                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                                        <Grid item xs={12} sm={3} md={2}>
                                            <Typography variant="h5">Question {i + 1}:</Typography>
                                        </Grid>

                                        <Grid item xs={10} sm={8} md={9}>
                                            <TextField
                                                id="outlined-basic"
                                                variant="outlined"
                                                fullWidth
                                                autoComplete="off"
                                                onChange={e => handleInputChange(e, i)}
                                                name="questionTitle"
                                                multiline value={q.questionTitle}
                                            />
                                        </Grid>

                                        <Grid item xs={2} sm={1}>
                                            <Button
                                                variant="standard"
                                                onClick={() => handleDeleteQuestion(i)}
                                            >
                                                <DeleteIcon color="error" />
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} sx={{ mt: 2 }}>
                                        <Grid item xs={12} md={2}>
                                            <Grid container spacing={2} >

                                                <Grid item xs={6} sm={4} md={12}>
                                                    <FormControl sx={{ width: 120 }}>
                                                        <InputLabel id="demo-simple-select-label">MCQ type</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={q.mcq}
                                                            label="MCQ Type"
                                                            size="small"
                                                            onChange={(e) => mcqTypeChange(e, i)}
                                                        >
                                                            <MenuItem value='single'>Single</MenuItem>
                                                            <MenuItem value='multiple'>Multiple</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={6} sm={4} md={12}>
                                                    <TextField
                                                        size="small"
                                                        name="questionMarks"
                                                        label="Marks"
                                                        type="number"
                                                        variant="outlined"
                                                        value={q.questionMarks}
                                                        onWheel={(e) => e.target.blur()}
                                                        onChange={(e) => handleInputChange(e, i)}
                                                        style={{ width: 120 }}
                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', style: { textAlign: "center" } }}
                                                    />
                                                </Grid>

                                                <Grid item xs={8} sm={4} md={12}>
                                                    <Button variant="contained" size="medium" sx={{ width: 120 }} onClick={e => handleAddOption(e, i)}>Add Option</Button>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} md={10} >
                                            {q.mcq == 'multiple' &&
                                                <FormGroup >
                                                    {q.options.map((op, o) => {
                                                        return (
                                                            <Grid container spacing={1} alignItems="center" sx={{ my: 0.5 }} key={o} >
                                                                <Grid item xs={10}  >
                                                                    <FormControl>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    checked={op.status}
                                                                                    onChange={e => handleOptionChange(e, i, o)}
                                                                                />
                                                                            }
                                                                            label={
                                                                                <TextField
                                                                                    id="outlined-basic"
                                                                                    variant="outlined"
                                                                                    autoComplete="off"
                                                                                    name="option"
                                                                                    multiline size="small"
                                                                                    color="info"
                                                                                    onChange={e => handleOptionInputChange(e, i, o)}
                                                                                    value={op.option}
                                                                                    sx={{ width: [300, 390, 500, 725] }}
                                                                                />
                                                                            }
                                                                        />
                                                                    </FormControl>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Button
                                                                        variant="standard"
                                                                        onClick={(e) => handleDeleteOption(e, i, o)}>
                                                                        <DeleteIcon color="error" fontSize="small" />
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    })}
                                                </FormGroup>
                                            }

                                            {q.mcq == 'single' &&
                                                <RadioGroup
                                                    className="noselect"
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    name="checked"
                                                    value={q.options.findIndex(item => item.status == true)}
                                                    onChange={(e) => onRadioChange(e, i)}
                                                >
                                                    {q.options.map((op, o) => (
                                                        <Grid container spacing={1} alignItems="center" sx={{ my: 0.5 }} >
                                                            <Grid item xs={10}  >
                                                                <FormControlLabel
                                                                    key={o}
                                                                    value={o}
                                                                    control={<Radio />}
                                                                    label={
                                                                        <TextField
                                                                            id="outlined-basic"
                                                                            variant="outlined"
                                                                            autoComplete="off"
                                                                            name="option"
                                                                            multiline size="small"
                                                                            color="info"
                                                                            onChange={e => handleOptionInputChange(e, i, o)}
                                                                            value={op.option}
                                                                            sx={{ width: [300, 390, 500, 725] }}
                                                                        />
                                                                    } />
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                <Button
                                                                    variant="standard"
                                                                    onClick={(e) => handleDeleteOption(e, i, o)}>
                                                                    <DeleteIcon color="error" fontSize="small" />
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                </RadioGroup>
                                            }

                                        </Grid>
                                    </Grid>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>
            </Container>
        </Page>
    );
}


const branch = [
    "CSE",
    "MECH",
    "ESE",
    "IT"
]

const section = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
    "C2",
    "D1",
]