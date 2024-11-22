import axios from 'axios';
import { refreshAccessToken } from '../services/apiServices';
import { store } from '../../redux/store';
import { logoutUser } from '../../redux/action/userAction';

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false; // 토큰 갱신 중인지 상태 관리
let failedQueue = []; // 갱신 중 대기 중인 요청을 저장

// 실패한 요청을 재시도
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// 요청 인터셉터
instance.interceptors.request.use(
    (config) => {
        const noAuthRequired = ['/login', '/signup', '/idcheck'];
        const isNoAuthRequired = noAuthRequired.some((path) => config.url && config.url.includes(path));

        if (!isNoAuthRequired) {
            const accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // 중복 요청 방지 플래그 설정
            originalRequest._retry = true;

            if (isRefreshing) {
                // 이미 토큰 갱신 중인 경우, 실패한 요청을 대기열에 추가
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return instance(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true; // 갱신 중 상태 설정
            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    alert("갱신 진행중");
                    // 갱신된 토큰으로 Authorization 헤더 업데이트
                    instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    processQueue(null, newAccessToken);
                    return instance(originalRequest); // 재시도
                } else {
                    processQueue(new Error('Failed to refresh token'), null);
                    store.dispatch(logoutUser());
                    window.location.href = '/'; // 토큰 갱신 실패 시 리다이렉트
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(logoutUser());
                window.location.href = '/';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false; // 갱신 중 상태 해제
            }
        }

        return Promise.reject(error); // 다른 에러는 그대로 반환
    }
);

export default instance;
