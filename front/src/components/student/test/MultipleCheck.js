
import React from 'react';
import {Box,Checkbox,Typography,FormControlLabel,Stack, Divider} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { StudentMultipleSingle } from '../../../redux/actions/student/studentTest';


export default function AppTasks({questionindex, title, marks, mcqQuestions, disabled, correct}) {

  const dispatch = useDispatch();
  const answers = useSelector((state) => state?.studentTestAnswer?.answer);
  const [checked, setchecked] = React.useState([...answers[questionindex]]);

  console.log(answers);
  
  const onchecksubmit = (event) => {
      const newchecked = checked;

      if(checked.includes(event.target.value)){
        const index = newchecked.indexOf(event.target.value);
        if (index > -1) {
          newchecked.splice(index, 1);
        }
      }else{
        newchecked.push(event.target.value);
      }

      var numberArray = newchecked.map(Number);

      answers[questionindex] = numberArray ;

      dispatch(StudentMultipleSingle(answers));
      setchecked(prevState => ([...newchecked]));
  }


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
                    checked={checked.includes(index.toString())} 
                    onChange={onchecksubmit} 
                    disabled={disabled} 
                  /> 
                }

                label={
                  <Typography className="noselect" variant="body2" 
                  // sx={{...(correct ? checked && {color: 'green'} : checked && {color: 'red'})}}
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
