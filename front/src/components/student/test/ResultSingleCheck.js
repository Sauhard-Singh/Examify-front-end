
import React from 'react';
import {Box,Typography,FormControlLabel, Divider, RadioGroup, Radio} from '@mui/material';


export default function AppTasks({title, marks, answered, mcqQuestions, dataQuestions,  disabled, correct}) {

    const [checked] = React.useState(answered[0]);
    

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
            >

                {mcqQuestions?.map((mcq, index) => (
                    <FormControlLabel key={index} value={index} control={<Radio />} 
                    
                    label={
                        <Typography className="noselect" variant="body2" 
                                sx={{...(index === answered[0] && ( mcq.status ? { color: 'green' } : {color: 'red'} ))}}
                        >
                            {mcq.option}
                        </Typography>
                        } 
                    disabled={true}
                    />
                ))}
            </RadioGroup>

            <Divider />
    </Box>
    );
}
