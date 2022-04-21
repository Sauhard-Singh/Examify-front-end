import { TEACHERPROFILE } from '../../constants/index.js';

const initialstate = {
    teacherProfile: null
}

const teacherProfileReducer = (state = initialstate,action) => {
    switch(action.type) {
        case TEACHERPROFILE :
            return {...state, teacherProfile: action?.data};

        default:
            return state;
    }
}

export default teacherProfileReducer;