import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
    (error) => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
  (response) => {
    return response; // 성공적으로 응답 받은 경우 그대로 반환
  },
  async (error) => {
    // 401: Unauthorized (토큰 만료 또는 잘못된 토큰)
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // 이미 리프레시 토큰을 이용한 요청을 하고 있다면 무한 루프 방지
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // refreshToken을 이용해 새로운 accessToken을 발급받는다
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/token/refresh`, {
          jwt: refreshToken,
        });

        const newAccessToken = response.data.accessToken;

        // 새로운 accessToken을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', newAccessToken);

        // 원래 요청의 Authorization 헤더에 새로운 accessToken을 추가
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

        // 원래 요청을 다시 시도
        return axios(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 유효하지 않거나 기타 오류 발생 시
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // 예를 들어 로그인 페이지로 리다이렉트하거나 사용자에게 로그아웃 알림을 보여줄 수 있음
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 그 외의 오류는 그대로 처리
    return Promise.reject(error);
  }
)

export default instance;