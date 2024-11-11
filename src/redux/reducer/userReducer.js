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

//린
// const INITIAL_STATE = {
//     account: {
//         access_token: '',
//         refresh_token: '',
//         username: '',
//         role: '',
//         phoneNum: '',
//         birth: '',
//     },
//     isAuthenticated: false
// };


const userReducer = (state = INITIAL_STATE, action) => {
    const { accessToken, birth, refreshToken, name, division, userid, phone_num, status } = action?.payload?.data || {};
    // const { access_token, birth, refresh_token, username, role, email, phone_num, status } = action?.payload?.DT || {}; //response에 없는 게 undefined로 처리됨
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
            return INITIAL_STATE;
        //린
        //     account: {
        //         access_token, // Maps to accessToken from the backend
        //         refresh_token, // Maps to refreshToken from the backend
        //         username, // Maps backend `name` to frontend `username`
        //         role, // Maps backend `division` to frontend `role`
        //         phoneNum: phone_num, // Maps backend `phone_num` to frontend `phoneNum`
        //         birth, // Maps directly if names match
        //         email, //Maps backend `userid` to frontend `email`
        //     },
        //     isAuthenticated: true
        // };
        default: return state;
    }
};

export default userReducer;