import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import Navbar from '../components/student/navbar/Navbar';


const RootStyle = styled(Page)(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	}
}));


export default function Homepage() {
	return (
	<RootStyle title="EXAMIFY">
		<Navbar isHome={true}/>
        <Box sx={{ backgroundColor: "#4caf50", height: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
        <Typography sx={{color: '#fff'}} variant="h1" gutterBottom>Examify</Typography>
        <Typography variant="h2" gutterBottom>AN ONLINE EXAM SYSTEM</Typography>
        </Box>
    </RootStyle>
	);
}