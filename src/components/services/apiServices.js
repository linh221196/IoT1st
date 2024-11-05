import axios from "../utils/axiosCustomize";

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

//환자가 봉사자 요청하기(예약 list)
const postCallVolunteer = (email, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('noteDate', noteDate)
    formData.append('noteContent', noteContent)

    return axios.post(`/callvolunteer`, formData);
}

//봉사자가 예약list, 출장list 요청
const postAllCallVolunteer = (email) => {
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/allcallvolunteer`, formData);
}

//사용자가 예약list, 출장list 요청
const postUserCall = (email) => {
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/callpatient`, formData)
}

//봉사자가 예약list 선택, 출장 list에 추가
const postVolunteerAssignment = (email, userid, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('userid', userid)
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/volunteerassignment`, formData)
}

//봉사자가 봉사완료
const postVolunteerComplete = (email, userid, notedate) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('userid', userid)
    formData.append('notedate', notedate)

    return axios.post(`/volunteercomplete`, formData)
}

//환자나 봉사자가 출장list 취소
const postAssignmentCancel = (email, userid, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email) //봉사자
    formData.append('userid', userid) //환자
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/assignmentcancel`, formData)
}

//환자가 예약list 수정
const postCallVolunteerModify = (email, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/callvolunteermodify`, formData)
}

//환자가 예약list 삭제
const postCallVolunteerDelete = (email, notedate) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('notedate', notedate)

    return axios.post(`/callvolunteerdelete`, formData)
}

export { postCreateNewUser, getAllUsers, putEditUserData, postLoggin, postUserId, postCallVolunteer,
    postAllCallVolunteer, postUserCall, postVolunteerAssignment, postVolunteerComplete, postAssignmentCancel,
    postCallVolunteerModify, postCallVolunteerDelete
}