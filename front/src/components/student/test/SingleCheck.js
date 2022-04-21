
import React from 'react';
import {Box,Typography,FormControlLabel, Divider, RadioGroup, Radio} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


export default function AppTasks({questionindex, title, marks, mcqQuestions,  disabled, correct}) {

    const dispatch = useDispatch();
    const answers = useSelector((state) => state?.studentTestAnswer?.answer);
    const [checked, setchecked] = React.useState(-1);

    console.log(answers);

    const oncheckSubmit = (event) => {
        answers[questionindex][0] = parseInt(event.target.value);
        setchecked(event.target.value);
    }


    return (
        <Box sx={{ px: 3, py: 1, mt: 3 }}>
            <Box sx={{pb:2, display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Typography className="noselect" variant="h4" noWrap>{title}</Typography>
                <Typography className="noselect" variant="h6" noWrap>marks:{marks}</Typography>
            </Box>

            <RadioGroup
                className="noselect"
                aria-labelledby="demo-radio-buttons-group-label"
                name="checked"
                value={checked}
                onChange={oncheckSubmit}
                disabled={disabled}
            >
                {mcqQuestions?.map((mcq, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} label={mcq.option} />
                ))}
            </RadioGroup>

            <Divider />
    </Box>
    );
}
