
import React from 'react';
import {Box,Checkbox,Typography,FormControlLabel,Stack, Divider} from '@mui/material';


export default function AppTasks({ title, marks, answered, mcqQuestions}) {

    const [checked] = React.useState(answered);

    return (
        <Box sx={{ px: 3, py: 1, mt: 3 }}>
            <Box sx={{pb:2, display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                <Typography className="noselect" variant="h4" noWrap>{title}</Typography>
                <Typography className="noselect" variant="h6" noWrap>marks:{marks}</Typography>
            </Box>

            {mcqQuestions.map((mcq, index) => (
                <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>

                    <FormControlLabel
                        control={ 
                            <Checkbox
                            value={index} 
                            checked={checked.includes(index)} 
                            disabled={true} 
                            /> 
                        }

                        label={
                            <Typography className="noselect" variant="body2" 
                                sx={{...(checked.includes(index) && ( mcq.status ? { color: 'green' } : {color: 'red'} ))}}
                            >
                                {mcq.option}
                            </Typography>
                        }
                    />
                    
                </Stack>
            ))}

            <Divider />
        </Box>
    );
}
