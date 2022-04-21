import { useState } from 'react';
import { Link as RouterLink,useHistory  } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography,Checkbox,TextField,IconButton,InputAdornment,FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Logo from '../../components/Logo';
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { TeacherLogin } from '../../redux/actions/teacher/teacherAuth';
import { useDispatch } from 'react-redux';



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





export default function Login() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	});

	const formik = useFormik({
		initialValues: {email: '',password: '',remember: true},
		validationSchema: LoginSchema,
		onSubmit: async(values) => {
			dispatch(TeacherLogin(values,history));
		}
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

	const handleShowPassword = () => {
		setShowPassword((show) => !show);
	};

	return (
		<RootStyle title="Teacher Login">

		<HeaderStyle>
			<RouterLink to="/"><Logo /></RouterLink>
			<MHidden width="smDown">
				<Typography variant="body2" sx={{mt: { md: -2 }}}>
					Don’t have an account? &nbsp;
					<Link underline="none" variant="subtitle2" component={RouterLink} to="/teacherRegister">Get started</Link>
				</Typography>
			</MHidden>
		</HeaderStyle>

		<MHidden width="mdDown">
			<SectionStyle>
				<Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>Hi, Welcome Back</Typography>
				<img src="/static/illustrations/illustration_login.png" alt="login" />
			</SectionStyle>
		</MHidden>

		<Container maxWidth="sm">
			<ContentStyle>
				<Stack sx={{ mb: 5 }}>
					<Typography variant="h4" gutterBottom>Login In Examify</Typography>
					<Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
				</Stack>

				<FormikProvider value={formik}>
					<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
						<Stack spacing={3}>
							<TextField
							fullWidth
							autoComplete="username"
							type="email"
							label="Email address"
							{...getFieldProps('email')}
							name="email"
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
							/>

							<TextField
							fullWidth
							autoComplete="current-password"
							type={showPassword ? 'text' : 'password'}
							label="Password"
							{...getFieldProps('password')}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
									<IconButton onClick={handleShowPassword} edge="end">
									<Icon icon={showPassword ? eyeFill : eyeOffFill} />
									</IconButton>
									</InputAdornment>
								)
							}}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
						/>
					</Stack>

					<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
						<FormControlLabel
							control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
							label="Remember me"
						/>
						<Link component={RouterLink} variant="subtitle2" to="/teacherforgot">Forgot password?</Link>
					</Stack>

					<LoadingButton  fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>Login</LoadingButton>
				</Form>
			</FormikProvider>

			<MHidden width="smUp">
				<Typography variant="body2" align="center" sx={{ mt: 3 }}>
					Don’t have an account?&nbsp;
					<Link variant="subtitle2" component={RouterLink} to="register">
						Get started
					</Link>
				</Typography>

			</MHidden>
			
			</ContentStyle>
		</Container>
    </RootStyle>
	);
}