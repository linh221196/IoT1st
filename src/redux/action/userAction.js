export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS'
export const LOGOUT_USER = 'LOGOUT_USER'; // 로그아웃 액션 타입 추가

export const doLoggin = (data) => {
    return (
        {
            type: FETCH_USER_LOGIN_SUCCESS,
            payload: data
        }
    )
}

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

