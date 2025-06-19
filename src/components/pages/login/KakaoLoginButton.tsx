import KakaoLoginImage from "@/assets/kakao_login_large_narrow.png";

function KakaoLoginButton() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <img
      src={KakaoLoginImage}
      alt="Kakao Login"
      onClick={handleKakaoLogin}
      className="px-20 w-full h-auto cursor-pointer"
    />
  );
}

export default KakaoLoginButton;
