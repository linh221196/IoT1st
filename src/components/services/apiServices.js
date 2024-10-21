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
    return axios.post(`/participant`, formData);
}

const getAllUsers = () => {
    // return axios.get(`/.../...`);
    return axios.get(`/participant/all`);
}

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
    return axios.put(`/participant`, formData)
}

const postLoggin = (email, password) => {
    const formData = new FormData();
    formData.append('email', email)
    formData.append('password', password)

    return axios.post(`/login`, formData)
}
export { postCreateNewUser, getAllUsers, putEditUserData, postLoggin }

