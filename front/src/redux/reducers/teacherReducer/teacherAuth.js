import { TEACHERLOGIN, TEACHERLOGOUT, TEACHERLOGINWITHOUTTOKEN  } from '../../constants/index.js';

const initialstate = {
    token: null
}

const teacherAuthReducer = (state = initialstate,action) => {
    switch(action.type) {
        case TEACHERLOGIN:
            localStorage.setItem('authToken', action?.data);
            localStorage.setItem('type', 'teacher');
            return {...state, token: action?.data};

        case TEACHERLOGINWITHOUTTOKEN:
            return {...state, token: action?.data?.token};

        case TEACHERLOGOUT:
            localStorage.clear();
            return { ...state, token: null };

        default:
            return state;
    }
}

export default teacherAuthReducer;