import { STUDENTRESULT } from '../../constants/index.js';

const initialstate = {
    studentResult: null
}

const studentResultReducer = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTRESULT:
            return {...state, studentResult: action?.data?.studentResult};

        
        default:
            return state;
    }
}

export default studentResultReducer;