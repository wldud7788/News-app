import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";

interface AuthFormProps {
  mode: "login" | "signup";
}
export const AuthForm = ({ mode }: AuthFormProps) => {
  const { login, isLoading, setIsLoading, signUp } = useAuthContext();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const nav = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사
    if (!formData.email || !formData.password) {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    if (mode === "signup" && !formData.nickname) {
      alert("닉네임을 입력해주세요");
      return;
    }

    setIsLoading(true);

    try {
      const success = await (mode === "login"
        ? login(formData.email, formData.password)
        : signUp(formData.email, formData.password, formData.nickname));
      if (success) {
        alert(mode === "login" ? "로그인 성공" : "회원가입 성공");
        nav("/");
      } else {
        alert(
          `${
            mode === "login" ? "로그인" : "회원가입"
          } 실패: 입력하신 정보를 다시 확인해주세요`
        );
      }
    } catch (error) {
      console.error(`${mode === "login" ? "로그인" : "회원가입"} 실패:`, error);
      alert(
        `${mode === "login" ? "로그인" : "회원가입"} 중 오류가 발생했습니다`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col w-full gap-[15px]" onSubmit={handleSubmit}>
      {mode === "signup" && (
        <input
          className="h-[40px] border border-1 border-gray-200 pl-[10px] rounded-l"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요 "
        />
      )}

      <input
        className="h-[40px] border border-1 border-gray-200 pl-[10px] rounded-lg"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="이메일을 입력해주세요"
        autoComplete="email"
      />
      <input
        className="h-[40px] border border-1 border-gray-200 pl-[10px] rounded-lg"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해주세요"
        autoComplete="current-password"
      />
      <button type="submit" className="h-[40px] bg-black rounded-lg text-white">
        {isLoading ? "처리중..." : mode === "login" ? "로그인" : "회원가입"}
      </button>
    </form>
  );
};
