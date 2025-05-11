import LogoImage from '../assets/logo.png';
import KakaoLoginButton from '../components/KakaoLoginButton';
import {useEffect, useState} from "react";
import axios from 'axios';

export default function Login() {
  const code = new URL(window.location.href).searchParams.get("code");

  const [loading, setLoading] = useState(false)

  // DEBUG: 테스트 계정 로그인 && 로고 이미지 클릭 이벤트 제거 필요
  const testLogin = () => {
    axios.get("test/token/1", {
      baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    })
      .then(res => {
        const data = res.data.data;

        console.log(data)

        // 로그인 성공 시 accessToken을 localStorage에 저장
        const accessToken = data.jwt;
        localStorage.setItem("accessToken", accessToken);

        window.location.href = "/main/home";
      })
  }

  useEffect(() => {
    if (code) {
      setLoading(true)

      axios.get("/auth/oauth/callback", {
        baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
        params: {
          provider: "kakao",
          code: code,
        },
      })
        .then(res => {
          const data = res.data.data;

          // 로그인 성공 시 accessToken을 localStorage에 저장
          const accessToken = data.jwt;
          localStorage.setItem("accessToken", accessToken);

          const hasCompletedSurvey = data.user.hasCompletedSurvey;

          if (hasCompletedSurvey) {
            // 설문조사를 완료한 경우 메인 페이지로 이동
            window.location.href = "/main/home";
          } else {
            // 설문조사를 완료하지 않은 경우 설문조사 페이지로 이동
            window.location.href = "/survey";
          }

        })
        .catch(err => {
          console.error(err)
          alert("로그인에 실패했습니다. 다시 시도해 주세요.")
          setLoading(false)
        })
    }
  }, [code]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8">
      {/* 로고 이미지 */}
      <div className="w-32 h-32 relative">
        <img src={LogoImage} alt="Logo Image" className="w-full h-full object-contain" onClick={testLogin}/>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">환영합니다</h1>
        <p className="text-gray-600">서비스를 이용하시려면 로그인해 주세요</p>
      </div>

      {/* 로그인 버튼 */}
      <KakaoLoginButton/>

      {/* 로그인 정보 인증 중 로딩 */}
      {loading &&
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-2">로그인 중...</p>
        </div>
      }
    </div>
  )
}
