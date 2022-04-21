import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import TeacherPrivateRoutes from './hoc/TeacherProctectedRoutes';
import StudentPrivateRoutes from './hoc/StudentProtectedRoutes';
import CustomRoute from './hoc/CustomRoute';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import routes from './routes/routes';
import ScrollToTop from './components/ScrollToTop';
import SnackBar from './Pages/Toast';
import { useDispatch } from 'react-redux';
import { Branch } from './redux/actions/student/studentAuth';
import React from 'react';
import { TeacherTestDetails } from './redux/actions/teacher/teacherTest';


export default function App() {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(Branch());
    }, []);


  return (
    <Router>
      <ThemeConfig>
        <ScrollToTop />
        <GlobalStyles />
        <SnackBar />
        <Switch>
          {routes.map((r, i) => (
            r.protected === true ? (
              r.isStudent === true ? (<StudentPrivateRoutes key={i} path={r.path} Component={r.component}/>) : 
              (<TeacherPrivateRoutes key={i} path={r.path} Component={r.component}/>)
            ) :
            (
              <CustomRoute key={i} path={r.path} Component={r.component}/>
            )
          ))}
        </Switch>

      </ThemeConfig>
    
    </Router>
  );
}