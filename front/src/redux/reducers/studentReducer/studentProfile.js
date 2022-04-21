import { STUDENTPROFILE } from '../../constants/index.js';

const initialstate = {
    studentProfile: null
}

const studentProfileReducer = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTPROFILE :
            console.log('STUDENTPROFILE');
            return {...state, studentProfile: action?.data};

        default:
            return state;
    }
}

export default studentProfileReducer;