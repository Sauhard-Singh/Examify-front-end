import { STUDENTTESTANSWER } from '../../constants/index.js';

const initialstate = {
    answer: []
}

const studentTestAnswer = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTTESTANSWER :
            return {...state, answer: action?.data};

        default:
            return state;
    }
}

export default studentTestAnswer;