import { supabase } from "../../supabase/supabaseClient";

export const SocialLogin = () => {
  const loginWithKakao = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
      });

      if (error) {
        console.error("Supabase kakao 인증 에러: ", error.message);
        return;
      }
    } catch (error) {
      console.error("예상치 못한 에러 발생: ", error);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Supabase google 인증 에러: ", error.message);
        return;
      }
    } catch (error) {
      console.error("예상치 못한 에러 발생: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-extrabold text-[18px] mt-5">소셜 로그인</h2>
      <p className="text-gray-500 text-sm">
        소셜 로그인으로 간편하게 로그인하세요
      </p>
      <button
        onClick={loginWithKakao}
        className="w-full h-[40px] bg-yellow-300 rounded-lg flex justify-center items-center gap-[10px]"
      >
        <img src="/logo/kakao.png" alt="kakao 로고" className="w-8" />
        <span>카카오 로그인</span>
      </button>
      <button
        onClick={loginWithGoogle}
        className="w-full h-[40px] rounded-lg border bg-[#4285f4] text-white flex justify-center items-center gap-[10px]"
      >
        <img src="/logo/google.png" alt="google 로고" className="w-10" />
        <span>구글 로그인</span>
      </button>
    </div>
  );
};
