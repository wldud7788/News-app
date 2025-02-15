import { Link } from "react-router-dom";
import { AuthForm } from "../components/auth/AuthForm";
import { SocialLogin } from "../components/auth/SocialLogin";

export const Login = () => {
  return (
    <div>
      <h2 className="font-extrabold text-[18px] mb-5">로그인</h2>
      <p className="mb-5 text-gray-500 text-sm">
        게정정보가 없으십니까?
        <Link to="/signup" className="text-blue-500 ml-2 font-semibold">
          회원가입
        </Link>
      </p>
      <AuthForm mode="login" />
      <SocialLogin />
    </div>
  );
};
