import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        accessToken: '',
        refreshToken: '',
        username: '',
        role: '',
        phoneNum: '',
        birth: '',
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    const { accessToken, birth, refreshToken, name, division, userid, phone_num } = action?.payload?.DT || {};
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
                    userid,
                },
                isAuthenticated: true
            };
        default: return state;
    }
};

export default userReducer;