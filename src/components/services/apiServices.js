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
    return axios.post(`/participant`, formData);
}

const getAllUsers = () => {
    return axios.get(`/participant/all`);
}

export { postCreateNewUser, getAllUsers }