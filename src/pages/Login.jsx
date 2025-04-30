import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {MessageSquare} from 'lucide-react';
import LogoImage from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/survey")
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white px-4 py-10">
      {/* Main content */}
      <div className="flex-1"></div>

      <div className="flex flex-col items-center justify-center w-full">
        {/* App name */}
        <h1 className="text-4xl font-black mb-8 text-black">마롱</h1>

        {/* Character - using placeholder image */}
        <div className="relative w-40 h-40 mb-20">
          <img src={LogoImage} alt="마롱 캐릭터" className="w-40 h-40"/>
        </div>

        {/* Start text */}
        <div className="text-xl font-bold mb-6 text-black">마롱 시작하기</div>

        {/* Kakao login button */}
        <button
          onClick={handleLogin}
          className="w-full max-w-md bg-yellow-300 text-black py-4 px-6 rounded-md flex items-center justify-center font-medium">
          <MessageSquare className="w-5 h-5 mr-2"/>
          카카오 로그인
        </button>
      </div>

      {/* Empty footer space */}
      <div className="flex-1"></div>
    </div>
  );
}
