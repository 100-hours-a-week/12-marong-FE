import LogoImage from '../assets/logo.png';
import KakaoLoginButton from '../components/KakaoLoginButton';
import {useEffect, useState} from "react";

export default function Login() {
  const code = new URL(window.location.href).searchParams.get("code");

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (code) {
      setLoading(true)

      // TODO: 로그인 API 호출

      // REMOVE: 로그인 API 호출 후 화면 이동
        setTimeout(() => {
            setLoading(false)
            window.location.href = "survey"
        }, 2000)

    }
  }, [code]);

  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-center space-y-8">
      <div className="w-32 h-32 relative">
        <img src={LogoImage} alt="Logo Image" className="w-full h-full object-contain"/>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">환영합니다</h1>
        <p className="text-gray-600">서비스를 이용하시려면 로그인해 주세요</p>
      </div>

      {/* 로그인 버튼 */}
      <KakaoLoginButton/>

      {loading &&
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-2">로그인 중...</p>
        </div>
      }
    </div>
  )
}
