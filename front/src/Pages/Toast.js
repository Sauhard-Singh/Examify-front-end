import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { ErrorReset } from '../redux/actions/student/studentAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state?.error?.isopen);
    const message = useSelector((state) => state?.error?.message)
    

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        console.log('yes');
        dispatch(ErrorReset());
    };

    return (
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity="error" sx={{ width: '100%' }}>{message}</Alert>
        </Snackbar>
    );
}