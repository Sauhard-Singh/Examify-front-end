import { STUDENTTEST } from '../../constants/index.js';

const initialstate = {
    studentTest: null
}

const studentTestReducer = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTTEST:
            return {...state, studentTest: action?.data?.studentTest};

        
        default:
            return state;
    }
}

export default studentTestReducer;