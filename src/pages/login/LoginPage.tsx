import { useMutation } from "@tanstack/react-query";
import { authQueries } from "@/api/auth/queries";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import KakaoLoginButton from "@/components/pages/login/KakaoLoginButton";
import LoadingScreen from "@/components/common/LoadingScreen";
import LogoImage from "@/assets/logo.png";
// import Marong from "@/assets/Marong";

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(false);

  const hasRequested = useRef(false);

  const { mutate: kakaoLogin } = useMutation({
    ...authQueries.kakaoLogin({ navigate }),
    onSettled: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (code && !isLoading && !hasRequested.current) {
      hasRequested.current = true;
      setIsLoading(true);
      kakaoLogin(code);
    }
  }, [code]);

  return (
    <div className="flex flex-col flex-1 gap-8 justify-center items-center w-full">
      <div className="relative w-32 h-32">
        <img
          src={LogoImage}
          alt="Logo Image"
          className="object-contain w-full h-full"
        />
        {/* <Marong className="size-32" fill="#915118" /> */}
      </div>

      <div className="mb-20 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Marong</h1>
        <p className="text-xl text-gray-600">
          카카오테크 부트캠프 마니또 서비스
        </p>
      </div>

      <KakaoLoginButton />

      {isLoading && <LoadingScreen message="로그인 중..." />}
    </div>
  );
}

export default LoginPage;
