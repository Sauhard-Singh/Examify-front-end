import HomePage from '../Pages/HomePage';

//student
import StudentHome from '../Pages/Student/MainPage';
import StudentLogin from '../Pages/Student/Login';
import StudentRegister from '../Pages/Student/Register';
import StudentTest from '../Pages/Student/Test';
import StudentResult from '../Pages/Student/Result';
import UpcomingTest from '../Pages/Student/UpcomingTestPage';
import SubmittedTest from '../Pages/Student/SubmittedTestPage';
import StudentVerify from '../Pages/Student/StudentVerify';
import StudentForgot from '../Pages/Student/Forgot';
import StudentReset from '../Pages/Student/Reset';

//teacher
import TeacherHome from '../Pages/Teacher/MainPage';
import TeacherLogin from '../Pages/Teacher/Login';
import TeacherRegister from '../Pages/Teacher/Register';
import AddTest from '../Pages/Teacher/NewTest';
import UpdateTest from '../Pages/Teacher/UpdateTest';
import Result from '../Pages/Teacher/Result';
import TeacherCompletedTest from '../Pages/Teacher/TeacherCompletedTest';
import TeacherUpcomingTest from '../Pages/Teacher/TeacherUpcomingTest';
import StudentTestResult from '../Pages/Teacher/StudentResult';
import TeacherVerify from '../Pages/Teacher/TeacherVerify';
import TeacherForgot from '../Pages/Teacher/Forgot';
import TeacherReset from '../Pages/Teacher/Reset';


const routes = [
  
    //student
    { 
        path: '/studentHome',
        component: StudentHome,
        protected: true,
        isStudent: true
    },
    { 
        path: '/StudentLogin',
        component: StudentLogin,
        protected: false,
        isStudent: true
    },
    { 
        path: '/StudentRegister',
        component: StudentRegister,
        protected: false,
        isStudent: true
    },
    { 
        path: '/StudentTest/:id',
        component: StudentTest,
        protected: true,
        isStudent: true
    },
    { 
        path: '/StudentResult/:id',
        component: StudentResult,
        protected: true,
        isStudent: true
    },
    { 
        path: '/StudentUpcomingTest',
        component: UpcomingTest,
        protected: true,
        isStudent: true
    },
    { 
        path: '/StudentSubmittedTest',
        component: SubmittedTest,
        protected: true,
        isStudent: true
    },
    {   
        path: '/studentVerify/:id',
        component: StudentVerify,
        protected: false,
        isStudent: true
        
    },
    {   
        path: '/studentForgot',
        component: StudentForgot,
        protected: false,
        isStudent: true
    },
    {   
        path: '/studentReset/:id',
        component: StudentReset,
        protected: false,
        isStudent: true
    },
    
    //teacher
    { 
        path: '/TeacherHome',
        component: TeacherHome ,
        protected: true,
        isStudent: false
    },
    { 
        path: '/TeacherLogin',
        component: TeacherLogin ,
        protected: false,
        isStudent: false
    },
    { 
        path: '/TeacherRegister',
        component: TeacherRegister,
        protected: false,
        isStudent: false
    },
    { 
        path: '/AddTest',
        component: AddTest ,
        protected: true,
        isStudent: false
    },
    { 
        path: '/UpdateTest/:id',
        component: UpdateTest ,
        protected: true,
        isStudent: false
    },
    { 
        path: '/TeacherUpcomingTest',
        component: TeacherUpcomingTest,
        protected: true,
        isStudent: false
    },
    { 
        path: '/TeacherCompletedTest',
        component: TeacherCompletedTest,
        protected: true,
        isStudent: false
    },
    { 
        path: '/Result/:id',
        component: Result,
        protected: true,
        isStudent: false
    },
    { 
        path: '/TestResult/:id',
        component: StudentTestResult,
        protected: true,
        isStudent: false
    },
    {   
        path: '/teacherVerify/:id',
        component: TeacherVerify,
        protected: false,
        isStudent: false
        
    },
    {   
        path: '/teacherForgot',
        component: TeacherForgot,
        protected: false,
        isStudent: false
    },
    {   
        path: '/TeacherReset/:id',
        component: TeacherReset,
        protected: false,
        isStudent: false
    },
    {
        path: '/',
        component: HomePage,
        protected: false,
        isStudent: false
    },
]


export default routes;