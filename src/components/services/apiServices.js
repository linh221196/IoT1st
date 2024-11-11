import axios from "../utils/axiosCustomize";
import {useSelector} from "react-redux";


//회원가입
const postCreateNewUser = (email, password, username, birth, phoneNum, role, userImage) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('birth', birth);
    formData.append('phoneNum', phoneNum);
    formData.append('role', role);
    if (userImage) {
        formData.append('userImage', userImage);
    }
    //return axios.post(`/...`, formData);
    // return axios.post(`/participant`, formData);
    return axios.post(`/signup`, formData)
}

const getAllUsers = () => {
    // return axios.get(`/.../...`);
    //http://localhost:8081/api/v1/login/participant/all
    // return axios.get(`/participant/all`);
}

//개인정보 수정 (pw 아님)
const putEditUserData = (id, username, role, userImage) => {
    const formData = new FormData();
    formData.append('id', id);
    if (username) {
        formData.append('username', username);
    }
    formData.append('role', role)
    if (userImage) {
        formData.append('userImage', userImage);
    }
    //return axios.put(`/...`)
    // return axios.put(`/participant`, formData)
}

//로그인
const postLoggin = (email, password) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)
//http://localhost:8081/api/v1/login

    return axios.post(`/login`, formData)
}

//ID 중복 check
const postUserId = (email) => {
    // return axios.get(`/email/{email}`)
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/idcheck`, formData);
}

//프론트
/*여기는 calendar관련 기능*/
//환자가 봉사자 요청하기(예약 list)
const postCallVolunteer = (email, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('userid', email)
    formData.append('desireddate', noteDate)
    formData.append('text', noteContent)

    return axios.post(`/callvolunteer`, formData);
}

//봉사자가 예약list, 출장list 요청
const postAllVolunteerCall = (email, refreshToken) => {
    const formData = new FormData();
    formData.append('userid', email)
    formData.append('refreshToken', refreshToken);

    return axios.post(`/allvolunteercall`, formData);
}

//사용자가 예약list, 출장list 요청
const postUserVolunteerCall = (email) => {
    const formData = new FormData();
    formData.append('userid', email)

    return axios.post(`/patientvolunteercall`, formData)
}

//봉사자가 예약list 선택, 출장 list에 추가
const postVolunteerAssignment = (email, userid, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('volunteerid', email) //봉사자
    formData.append('userid', userid) //환자
    formData.append('assignmentdate', noteDate)
    formData.append('text', noteContent)

    return axios.post(`/volunteerassignment`, formData)
}

//봉사자의 봉사횟수
const postVolunteerTime = (email) => {
    const formData = new FormData();
    formData.append('volunteerid', email) //봉사자

    return axios.post(`/volunteertime`, formData)
}


//봉사자가 봉사완료
const postVolunteerComplete = (email, userid, noteDate) => {
    const formData = new FormData();
    formData.append('volunteerid', email) //봉사자
    formData.append('userid', userid) //환자
    formData.append('assignmentdate', noteDate)

    return axios.post(`/volunteercomplete`, formData)
}

//환자나 봉사자가 출장list 취소
const postAssignmentCancel = (email, userid, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('volunteerid', email) //봉사자
    formData.append('userid', userid) //환자
    formData.append('assignmentdate', noteDate)
    formData.append('text', noteContent)

    return axios.post(`/assignmentcancel`, formData)
}

//환자가 예약list 수정
const postVolunteerCallModify = (email, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('userid', email)
    formData.append('desireddate', noteDate)
    formData.append('text', noteContent)

    return axios.post(`/volunteercallmodify`, formData)
}

//환자가 예약list 삭제
const postVolunteerCallDelete = (email, noteDate) => {
    const formData = new FormData();
    formData.append('userid', email)
    formData.append('desireddate', noteDate)

    return axios.post(`/volunteercalldelete`, formData)
}

//의료진이 환자를 추가하기 위해 검색
const postSearchPatient = (searchdata) => {
    const formData = new FormData();
    formData.append('searchdata', searchdata)

    return axios.post(`/searchpatient`, formData)
}

//의료진이 담당환자 추가
const postAssignmentPatient = (email, userid) => {
    const formData = new FormData();
    formData.append('medicalid', email)
    formData.append('userid', userid)

    return axios.post( `/assignmentpatient`, formData)
}

//의료진이 담당 환자 list 받기
const postLoadPatient = (email) => {
    const formData = new FormData();
    formData.append('medicalid', email)

    return axios.post(`/loadpatient`, formData)
}

//의료진이 담당 환자 list 삭제
const postDeletePatient = (email, userid) => {
    const formData = new FormData();
    formData.append('medicalid', email)
    formData.append('userid', userid)

    return axios.post(`/deletepatient`, formData)
}

//담당 환자의 필요 측정 요소 list를 불러오기
const postMeasurePatient = (userid) => {
    const formData = new FormData();
    formData.append('userid', userid)

    return axios.post(`/loadmeasure`, formData)
}

//담당 환자의 필요 측정 요소 list를 수정하기
const postModifyMeasure = (userid, spo2, airflow, bodytemp, ecg, emg, gsr, nibp) => {
    const formData = new FormData();
    formData.append('userid', userid)
    formData.append('airflow', airflow)
    formData.append('bodytemp', bodytemp)
    formData.append('nibp', nibp)
    formData.append('spo2', spo2)
    formData.append('ecg', ecg)
    formData.append('emg', emg)
    formData.append('gsr', gsr)
    console.log(userid, spo2, airflow, bodytemp, ecg, emg, gsr, nibp)

    return axios.post(`/modifymeasure`, formData)
}

export { postCreateNewUser, getAllUsers, putEditUserData, postLoggin, postUserId, postCallVolunteer,
    postAllVolunteerCall, postUserVolunteerCall, postVolunteerAssignment, postVolunteerComplete, postAssignmentCancel,
    postVolunteerCallModify, postVolunteerCallDelete, postSearchPatient, postAssignmentPatient, postLoadPatient,
    postDeletePatient, postMeasurePatient, postModifyMeasure, postVolunteerTime
}