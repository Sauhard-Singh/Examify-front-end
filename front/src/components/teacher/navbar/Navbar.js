import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar,Button} from '@mui/material';
import AccountPopover from './AccountPopover';
import Logo from '../../Logo';
import { Link as RouterLink, useHistory} from 'react-router-dom';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: '1px',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
        width: '100%'
    }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: APPBAR_DESKTOP,
        padding: theme.spacing(0, 5)
    }
}));


export default function DashboardNavbar({isHome}) {
    const history = useHistory();
    return (
        <RootStyle>
            <ToolbarStyle>
                <RouterLink to='/'><Logo /></RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                
                {isHome === false && 
                    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                        <AccountPopover name ="Yogesh" email="yashrdr11@gmail.com" />
                        
                    </Stack>
                }

                {
                    isHome === true &&
                    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                        <Button variant="outlined" onClick={() => history.push('/studentLogin')}>Student </Button>
                        <Button variant="contained" onClick={() => history.push('/teacherLogin')}>Teacher</Button>
                    </Stack>
                }
                
            </ToolbarStyle>
    </RootStyle>
  );
}
