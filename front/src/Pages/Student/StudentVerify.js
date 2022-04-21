import { useHistory, useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Page from '../../components/Page';
import { useDispatch } from 'react-redux';
import React from 'react';
import {StudentVerify} from '../../redux/actions/student/studentAuth';



const HeaderStyle = styled('header')(({ theme }) => ({
	top: 0,
	zIndex: 9,
	lineHeight: 0,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	position: 'absolute',
	padding: theme.spacing(3),
	justifyContent: 'space-between',
	[theme.breakpoints.up('md')]: {
		alignItems: 'flex-start',
		padding: theme.spacing(7, 5, 0, 7)
	}
}));


const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	}
}));




export default function Register() {
	const dispatch = useDispatch();
    const history = useHistory();

    let { id } = useParams();

    React.useEffect(() => {
        dispatch(StudentVerify(id , history));
    }, [])

	return (
	<RootStyle title="Student Verify">
        <div>You are Verifying Pls dont Refersh</div>
	</RootStyle>
  );
}