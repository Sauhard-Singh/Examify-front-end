import * as api from '../../../apis/index';
import { STUDENTLOGIN, STUDENTPROFILE, ERROR, BRANCH } from '../../constants/index';



export const StudentRegister = (formData, router) => async (dispatch) => {
    try {
        const data = await api.studentRegister(formData);
        if(data.data.success == true){
            router.push('/studentLogin')
        }else{
            dispatch({type: ERROR, data:{message: data?.data?.message, isopen: true, type: ''}});
            return {data, success: false};
        }
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
}


export const StudentVerify = (formData, router) => async (dispatch) =>  {
    try {
        
        const data = await api.studentVerifyRegister(formData);
        if(data.data.success){
            router.push('/studentLogin')
        }else{
            dispatch({type: ERROR, data:{message: data?.data?.message, isopen: true, type: ''}});
            // return {data, success: false};
        }
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
}


export const StudentLogin = (formData, router) => async (dispatch) => {
    try {
        const data = await api.studentLogin(formData);
        if(data.data.success){
            dispatch({type: STUDENTLOGIN, data: data?.data?.token});
            dispatch({type: STUDENTPROFILE, data: data?.data?.student});
            localStorage.setItem('name', data?.data?.student?.name);
            localStorage.setItem('email', data?.data?.student?.email);
            router.push('/studentHome')
        }else{
            dispatch({type: ERROR, data:{message: data?.data?.message, isopen: true, type: ''}});
            // return {data, success: false};
        }
        
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
}

export const StudentForgot = (id, formData, router) => async (dispatch) => {
    try {
    
        const data = await api.studentForgot(id, formData);
        if(data.data.success){
            dispatch({type: ERROR, data:{message: 'Reset link is send to email', isopen: true, type: ''}});
            // return {data, success: false};
        }else{
            dispatch({type: ERROR, data:{message: data?.data?.message, isopen: true, type: ''}});
            // return {data, success: false};
        }
        
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
}

export const StudentReset = (token, formData, router) => async (dispatch) => {
    try {
    
        const data = await api.studentReset(token, formData);
        console.log(data?.data);
        if(data.data.success){
            router.push('/studentLogin')
        }else{
            dispatch({type: ERROR, data:{message: data?.data?.message, isopen: true, type: ''}});
            // return {data, success: false};
        }
        
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
}


export const ErrorReset = () => async(dispatch) => {
    try {
        dispatch({type: ERROR, data:{message: '', isopen: false, type: ''}});
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
    
}



export const Branch = () => async(dispatch) => {
    try {
        const data = await api.getBranch();

        if(data?.data?.success){
            dispatch({type: BRANCH, data:data?.data});
        }else{
            dispatch({type: ERROR, data:{message: 'SERVER ERROR PLS TRY AFTER SOME TIME', isopen: true, type: ''}});
            // return {data, success: false};
        }
        
    } catch (error) {
        dispatch({type: ERROR, data:{message: error.message, isopen: true, type: ''}});
    }
    
}