import { STUDENTLOGIN, STUDENTLOGOUT, STUDENTLOGINWITHOUTTOKEN  } from '../../constants/index.js';

const initialstate = {
    token: null
}

const studentAuthReducer = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTLOGIN:
            localStorage.setItem('authToken', action?.data);
            localStorage.setItem('type', 'student');
            return {...state, token: action?.data};

        case STUDENTLOGINWITHOUTTOKEN:
            return {...state, token: action?.data?.token};

        case STUDENTLOGOUT:
            localStorage.clear();
            return { ...state, token: null };

        default:
            return state;
    }
}

export default studentAuthReducer;