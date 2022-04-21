import * as api from '../../../apis/index';
import { TEACHERLOGIN, TEACHERPROFILE, ERROR, BRANCH } from '../../constants/index';



export const TeacherRegister = (formData, router) => async (dispatch) => {
   try {
      const data = await api.teacherRegister(formData);
      if (data.data.success == true) {
         router.push('/TeacherLogin')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}


export const TeacherVerify = (formData, router) => async (dispatch) => {
   try {
      const data = await api.teacherVerifyRegister(formData);
      if (data.data.success) {
         router.push('/TeacherLogin')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}


export const TeacherLogin = (formData, router) => async (dispatch) => {
   try {
      const data = await api.teacherLogin(formData);
      if (data.data.success) {
         dispatch({ type: TEACHERLOGIN, data: data?.data?.token });
         dispatch({ type: TEACHERPROFILE, data: data?.data?.teacher });
         localStorage.setItem('name', data?.data?.teacher?.name);
         localStorage.setItem('email', data?.data?.teacher?.email);
         router.push('/TeacherHome')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
      }

   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherForgot = (id, formData, router) => async (dispatch) => {
   try {

      const data = await api.teacherForgot(id, formData);
      if (data.data.success) {
         dispatch({ type: ERROR, data: { message: 'Reset link is send to email', isopen: true, type: '' } });
         // return {data, success: false};
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         // return {data, success: false};
      }

   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherReset = (token, formData, router) => async (dispatch) => {
   try {

      const data = await api.teacherReset(token, formData);
      if (data.data.success) {
         router.push('/TeacherLogin')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
      }

   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const ErrorReset = () => async (dispatch) => {
   try {
      dispatch({ type: ERROR, data: { message: '', isopen: false, type: '' } });
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }

}