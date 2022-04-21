import { useState } from 'react';
import { Link as RouterLink, useHistory, useParams} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography,TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { TeacherReset } from '../../redux/actions/teacher/teacherAuth';
import { useDispatch } from 'react-redux';


const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	}
}));

const SectionStyle = styled(Card)(({ theme }) => ({
	width: '100%',
	maxWidth: 464,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(12, 0)
}));





export default function Forgot() {
	const dispatch = useDispatch();
	const history = useHistory();
    const {id} = useParams();
	
	const LoginSchema = Yup.object().shape({
		password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match!").required('Required')
	});

	const formik = useFormik({
		initialValues: {password: '', confirmPassword: ''},
		validationSchema: LoginSchema,
		onSubmit: async(values) => {
			dispatch(TeacherReset(id, values, history));
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

	

	return (
		<RootStyle title="Teacher | Reset Passsword">


		<MHidden width="mdDown">
			<SectionStyle>
				<Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>Examify Reset Password</Typography>
				<img src="/static/illustrations/illustration_login.png" alt="login" />
			</SectionStyle>
		</MHidden>

		<Container maxWidth="sm">
			<ContentStyle>

				<Stack sx={{ mb: 5 }}>
					<Typography variant="h4" gutterBottom>Reset Your password</Typography>
					<Typography sx={{ color: 'text.secondary' }}>Enter Your New Password</Typography>
				</Stack>

				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>

						<Stack spacing={3} sx={{mb: 3}}>

							<TextField
							fullWidth
							type="password"
							label="Password"
							{...getFieldProps('password')}
							name="password"
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
							/>

                            <TextField
							fullWidth
							type="password"
							label="Confirm Password"
							{...getFieldProps('confirmPassword')}
							name="confirmPassword"
							error={Boolean(touched.confirmPassword && errors.confirmPassword)}
							helperText={touched.confirmPassword && errors.confirmPassword}
							/>

						</Stack>

						<LoadingButton  fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
							Reset Passsword
						</LoadingButton>

					</Form>
				</FormikProvider>

			</ContentStyle>
		</Container>
    </RootStyle>
	);
}