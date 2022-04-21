import * as api from '../../../apis/index';
import { TEACHERTESTDETAILS,ERROR} from '../../constants/index';



export const TeacherTestDetails = () => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.teacherTestDetails(token);
      if (data.data.success == true) {
         dispatch({ type: TEACHERTESTDETAILS, data: data?.data})
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherAddTest = (formData, router) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.teacherAddTest(formData,token);

      if (data.data.success == true) {
         router.push('/TeacherHome')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherUpdateTest = (formData, router) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.teacherUpdateTest(formData,token);
      if (data.data.success == true) {
         router.push('/TeacherHome')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherDeleteTest = (formData, router) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.teacherDeleteTest(formData,token);
      if (data.data.success == true) {
         router.push('/TeacherHome')
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const TeacherSpecificTest = (formData) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.teacherSpecificTest(formData,token);
      if (data.data.success == true) {
         return {success: true, data: data?.data}
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}

export const SpecificStudentResult = (formData) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.specificStudentResult(formData,token);
      if (data.data.success == true) {
         return {success: true, data: data?.data?.result}
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}