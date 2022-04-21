import axios from 'axios';

const API = axios.create({ baseURL: 'https://examifyexam.herokuapp.com'})

//Branch
export const getBranch = () => API.get('/branch');


//Student
export const studentRegister = (requestbody) => API.post(`/studentRegister`, requestbody);   
export const studentVerifyRegister = (token) => API.post(`/studentVerify/${token}`);
export const studentLogin = (requestbody) => API.post(`/studentlogin`, requestbody);
export const studentForgot = (requestbody) => API.post(`/studentForgot`, requestbody);
export const studentReset = (token, requestbody) => API.post(`/studentReset/${token}`, requestbody);

export const studentProfile = (token) => API.get(`/studentProfile`, {headers: { Authorization: `Bearer ${token}`}})
export const studentTestSubmit = (requestbody, token) => API.post(`/studentTestSubmit`, requestbody, {headers: { Authorization: `Bearer ${token}`}})
export const studentTestDetails = (token) => API.get(`/studentTestDetails`, {headers: { Authorization: `Bearer ${token}`}})
export const studentResult = (testId, token) => API.get(`/studentResult/${testId}`, {headers: { Authorization: `Bearer ${token}`}})
export const studentTest = (testId, token) => API.get(`/specificTest/${testId}`, {headers: { Authorization: `Bearer ${token}`}})
//Teacher
export const teacherRegister = (requestbody) => API.post(`/teacherRegister`, requestbody);   
export const teacherVerifyRegister = (token) => API.post(`/teacherVerify/${token}`);
export const teacherLogin = (requestbody) => API.post(`/teacherlogin`, requestbody);
export const teacherForgot = (requestbody) => API.post(`/teacherForgot`, requestbody);
export const teacherReset = (token, requestbody) => API.post(`/teacherReset/${token}`, requestbody);
export const teacherProfile = (token) => API.get(`/teacherProfile`, {headers: { Authorization: `Bearer ${token}`}});
export const teacherAddTest = (requestbody, token) => API.post(`/addTest`, requestbody, {headers: { Authorization: `Bearer ${token}`}});
export const teacherUpdateTest = (requestbody, token) => API.put(`/updateTest`, requestbody, {headers: { Authorization: `Bearer ${token}`}});
export const teacherDeleteTest = (testId, token) => API.get(`/deleteTest/${testId}`, {headers: { Authorization: `Bearer ${token}`}});
export const teacherTestDetails = (token) => API.get(`/teacherTestDetails`, {headers: { Authorization: `Bearer ${token}`}})
export const teacherSpecificTest = (testId, token) => API.get(`/teacherSpecificTest/${testId}`, {headers: { Authorization: `Bearer ${token}`}});

//one more api remaning
export const specificStudentResult = (id, token) => API.get(`/studentSpecificResult/${id}`, {headers: { Authorization: `Bearer ${token}`}});