import { BRANCH} from '../constants/index';

const initialstate = {
    branch: []
}

const branchDetails = (state = initialstate,action) => {
    switch(action.type) {
        case BRANCH:
            return {...state, branch: action.data.branch};

        default:
            return state;
    }
}

export default branchDetails;