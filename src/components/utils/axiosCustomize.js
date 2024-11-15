import axios from 'axios';
import { refreshAccessToken } from '../services/apiServices';

const instance = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
    (config) => {
        try {
            // 디버깅용 URL 확인
            console.log(`[Axios Request] 요청 URL: ${config.url}`);

            // 로그인, 회원가입, 아이디 체크 요청이 아닐 때만 Authorization 헤더 추가
            const noAuthRequired = ['/login', '/signup', '/idcheck'];
            const isNoAuthRequired = noAuthRequired.some((path) => config.url && config.url.includes(path));

            if (!isNoAuthRequired) {
                const accessToken = localStorage.getItem('accessToken');
                if (accessToken) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    console.log(`[Axios Request] Authorization 헤더 추가됨: ${config.headers['Authorization']}`);
                } else {
                    console.warn(`[Axios Request] Authorization 헤더 추가 실패: 토큰이 존재하지 않음`);
                }
            } else {
                console.log(`[Axios Request] Authorization 헤더 추가하지 않음: ${config.url}`);
            }

            // 최종적으로 설정된 헤더를 콘솔에 출력
            console.log('[Axios Request] 최종 요청 헤더:', config.headers);

            return config;
        } catch (error) {
            console.error('[Axios Request] 요청 인터셉터 오류:', error);
            throw error;
        }
    },
    (error) => {
        console.error('[Axios Request] 요청 인터셉터 에러:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
    (response) => {
        console.log(`[Axios Response] 성공:`, response);
        return response && response.data ? response.data : response;
    },
    async (error) => {
        try {
            const originalRequest = error.config;
            console.error(`[Axios Response] 오류 발생: ${error.response?.status || '네트워크 오류'}`, error);

            // 토큰 만료 (401) 처리
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                console.warn('[Axios Response] 401 오류: 토큰 갱신 시도');
                originalRequest._retry = true;

                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    localStorage.setItem('accessToken', newAccessToken);
                    instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    console.log('[Axios Response] 토큰 갱신 성공, 요청 재시도');
                    return instance(originalRequest);
                } else {
                    console.error('[Axios Response] 토큰 갱신 실패');
                }
            }

            return Promise.reject(error);
        } catch (interceptorError) {
            console.error('[Axios Response] 응답 인터셉터 오류:', interceptorError);
            return Promise.reject(interceptorError);
        }
    }
);

export default instance;
