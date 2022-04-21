import { combineReducers } from 'redux';
import studentAuth from './studentReducer/studentAuth';
import teacherAuth from './teacherReducer/teacherAuth';
import studentProfile from './studentReducer/studentProfile';
import teacherProfile from './teacherReducer/teacherProfile';
import teacherTestDetails from './teacherReducer/teacherTestDetails';
import studentTestDetails from './studentReducer/studentTestDetails';
import studentTestAnswer from './studentReducer/studentTestAnswer';
import error from './error';
import branch from './branch';

export default combineReducers({
    studentAuth,
    studentProfile,
    teacherAuth,
    teacherProfile,
    teacherTestDetails,
    error,
    branch,
    studentTestDetails,
    studentTestAnswer
});