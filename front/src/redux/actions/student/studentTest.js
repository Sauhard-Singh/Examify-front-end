import * as api from '../../../apis/index';
import { STUDENTTESTDETAILS,ERROR, STUDENTTESTANSWER} from '../../constants/index';



export const StudentTestDetails = () => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.studentTestDetails(token);

      const testData = data?.data;

      var ongoingTest = [];
      var testSubmitted = [];
      var on = 0;


      testData?.ongoingTest.forEach((i, index) => {
         const ongoing = {...i, status: true}
         ongoingTest.push(ongoing)
         on = on+1;

         testData?.testGiven.forEach((j) => {
               if(i._id === j.testId){
                  on = on-1;
                  ongoingTest[index].status = false;
                  const testPush = {...i, marks: 'Marks wll displayed soon', testSubmitId: 'none', status: true};
                  testSubmitted.push(testPush);
               }
         })
      })
      
      
      var missedTest = 0;

      testData?.historyTest.forEach((i) => {
         testData?.testGiven.forEach((j) => {
            if(i._id == j.testId){
               const testPush = {...i, marks: j.marks, testSubmitId: j._id, status: false};
               testSubmitted.push(testPush);
            }
         })
      })

      missedTest = testData?.historyTest?.length - testSubmitted.length;

      if(testData?.success == true){
         dispatch({ type: STUDENTTESTDETAILS, data: testData, testSubmitted, missedTest, ongoingTest, on})
      }else{
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }

   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}


export const StudentResult = (formData) => async (dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.studentResult(formData, token);
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


export const studentTest = (formData, router) => async(dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.studentTest(formData, token);
      if (data.data.success == true) {
         const nowTimeStamp = new Date().getTime()/1000;
         if(nowTimeStamp > data.data.test.endTime){
            dispatch({ type: ERROR, data: { message: 'Test Time Exhausted', isopen: true, type: '' } });
            router.push('/studentHome');
         }

         return {success: true, data: data?.data}
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         router.push('/studentHome');
      }
   } catch (error) {
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
      router.push('/studentHome');
   }
}


export const StudentAnswer = (formData) => async(dispatch) => {
   console.log('triggereere')
   const questions = formData.questions;
   const answer = [];
   for(var i=0;i<questions.length;i++) {
      answer.push([]);
   }
   dispatch({ type: STUDENTTESTANSWER, data: answer });
}


export const StudentMultipleSingle = (formData) => async(dispatch) => {
   dispatch({ type: STUDENTTESTANSWER, data: formData });
}


export const submitTestAction = (formData , router) => async(dispatch) => {
   try {
      const token = await localStorage.getItem('authToken');
      const data = await api.studentTestSubmit(formData, token);

      if (data.data.success == true) {
         dispatch({ type: ERROR, data: { message: 'Test Successfully Submitted', isopen: true, type: '' } });
         router.push('/studentHome');
      } else {
         dispatch({ type: ERROR, data: { message: data?.data?.message, isopen: true, type: '' } });
         return { data, success: false };
      }

   } catch (error) {
      console.log(error);
      dispatch({ type: ERROR, data: { message: error.message, isopen: true, type: '' } });
   }
}