import { ERROR } from '../constants/index';

const initialstate = {
    message: '',
    isopen: false,
    type: ''
}

const errorDetails = (state = initialstate,action) => {
    switch(action.type) {
        case ERROR:
            console.log('ERROR');
            console.log(action.data);
            return {...state, message: action.data.message, isopen: action.data.isopen, type: action.data.type};

        default:
            return state;
    }
}

export default errorDetails;