import { FETCH_USER_LOGIN_SUCCESS, LOGOUT_USER } from '../action/userAction';

const INITIAL_STATE = {
    account: {
        accessToken: '',
        refreshToken: '',
        username: '',
        role: '',
        phoneNum: '',
        birth: '',
        status: '',
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    const { accessToken, birth, refreshToken, name, division, userid, phone_num, status } = action?.payload?.data || {};
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log(`check action: `, action)
            return {
                ...state,
                account: {
                    accessToken, // Maps to accessToken from the backend
                    refreshToken, // Maps to refreshToken from the backend
                    username: name, // Maps backend `name` to frontend `username`
                    role: division, // Maps backend `division` to frontend `role`
                    phoneNum: phone_num, // Maps backend `phone_num` to frontend `phoneNum`
                    birth, // Maps directly if names match
                    email: userid, //Maps backend `userid` to frontend `email`
                },
                isAuthenticated: true
            };

        case LOGOUT_USER:
            console.log(`current state before reset: `, state);
            return INITIAL_STATE;
        default: return state;
    }
};

export default userReducer;