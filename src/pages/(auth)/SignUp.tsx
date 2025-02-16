import { Link } from "react-router-dom";
import { AuthForm } from "../../components/auth/AuthForm";
import { SocialLogin } from "../../components/auth/SocialLogin";

export const SignUp = () => {
  return (
    <div>
      <h2 className="font-extrabold text-[18px] mb-5">회원가입</h2>
      <p className="mb-5 text-gray-500 text-sm">
        이미 계정이 있으십니까?
        <Link to="/login" className="text-blue-500 ml-2 font-semibold">
          로그인
        </Link>
      </p>
      <AuthForm mode="signup" />
      <SocialLogin />
    </div>
  );
};
