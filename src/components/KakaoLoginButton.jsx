"use client"

import KakaoLoginLargeNarrow from "../assets/kakao_login_large_narrow.png"
import KakaoLoginMediumNarrow from "../assets/kakao_login_medium_narrow.png"

function KakaoLoginButton() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;

  }

  return (
    <img
      src={KakaoLoginMediumNarrow}
      alt="카카오 로그인 버튼"
      className="h-auto cursor-pointer"
      onClick={handleKakaoLogin}
    />
  )
}

export default KakaoLoginButton