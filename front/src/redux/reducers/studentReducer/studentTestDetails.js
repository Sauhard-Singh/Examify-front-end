import { STUDENTTESTDETAILS, STUDENTTESTSUBMITTED } from '../../constants/index.js';

const initialstate = {
    ongoingTest: [],
    todayTest:[],
    upcomingTest: [],
    testSubmitted:[],
    missedTest:0,
    on: 0
}

const studentTestDetails = (state = initialstate,action) => {
    switch(action.type) {
        case STUDENTTESTDETAILS :
            return {...state, ongoingTest: action?.ongoingTest, todayTest: action?.data?.todayTest, upcomingTest: action?.data?.upcomingTest, testSubmitted: action?.testSubmitted, missedTest: action?.missedTest, on: action?.on};

        default:
            return state;
    }
}

export default studentTestDetails;