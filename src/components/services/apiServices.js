import axios from "../utils/axiosCustomize";

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

//ID check
const postUserId = (email) => {
    // return axios.get(`/email/{email}`)
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/idcheck`, formData);
}

//desired_volunteer
const postCallVolunteer = (email, noteDate, noteContent) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('noteDate', noteDate)
    formData.append('noteContent', noteContent)

    return axios.post(`/callvolunteer`, formData);
}

//all desired_volunteer_date
const postAllCallVolunteer = (email) => {
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/allcallvolunteer`, formData);
}

//User desired_volunteer_date
const postUserCall = (email) => {
    const formData = new FormData();
    formData.append('email', email)

    return axios.post(`/callpatient`, formData)
}

//봉사자 배정하기
const postVolunteerAssignment = (email, userid, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('userid', userid)
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/volunteerassignment`, formData)
}

//봉사자 봉사 완료
const postVolunteerComplete = (email, userid, notedate) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('userid', userid)
    formData.append('notedate', notedate)

    return axios.post(`/volunteercomplete`, formData)
}

//봉사 취소
const postAssignmentCancel = (email, userid, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email) //봉사자
    formData.append('userid', userid) //환자
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/assignmentcancel`, formData)
}

//환자의 예약 수정
const postCallVolunteerModify = (email, notedate, text) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('notedate', notedate)
    formData.append('text', text)

    return axios.post(`/callvolunteermodify`, formData)
}

//예약 삭제
const postCallVolunteerDelete = (email, notedate) => {

}

export { postCreateNewUser, getAllUsers, putEditUserData, postLoggin, postUserId, postCallVolunteer,
    postAllCallVolunteer, postUserCall, postVolunteerAssignment, postVolunteerComplete, postAssignmentCancel,
    postCallVolunteerModify
}