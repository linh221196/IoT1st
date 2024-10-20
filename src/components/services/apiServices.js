import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, userImage) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('role', role);
    if (userImage) {
        formData.append('userImage', userImage);
    }
    //return axios.post(`/...`, formData);
    //return axios.post(`/participant`, formData);
    return axios.post('/signup', formData)
        .then(response => {
            // 성공적인 응답 처리
            console.log('Response Data:', response.data);
            return response.data; // 클라이언트에서 사용할 수 있도록 반환
        })
        .catch(error => {
            console.error('There was an error!', error.response ? error.response.data : error.message);
            throw error; // 오류를 호출자에게 전파
        });

}

const getAllUsers = () => {
    // return axios.get(`/.../...`);
    // return axios.get(`/participant/all`);
}

const postEditUserData = () => {
    //return axios.post(`/...`)
    // return axios.post(`/profile`)
}
export { postCreateNewUser, getAllUsers }