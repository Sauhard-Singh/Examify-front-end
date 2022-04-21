import { TEACHERTESTDETAILS } from '../../constants/index.js';

const initialstate = {
    ongoingTest: [],
    todayTest:[],
    upcomingTest: [],
    historyTest:[],
}

const teacherTestDetails = (state = initialstate,action) => {
    switch(action.type) {
        case TEACHERTESTDETAILS :
            return {...state, ongoingTest: action?.data?.ongoingTest, todayTest: action?.data?.todayTest, upcomingTest: action?.data?.upcomingTest, historyTest: action?.data?.historyTest};
        default:
            return state;
    }
}

export default teacherTestDetails;