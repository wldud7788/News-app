import { MypageSkeleton } from "./MypageSkeleton";
import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

export const Mypage = () => {
  const { user, setUser, logout, isLoading } = useAuthContext();
  const nav = useNavigate();
  const [newName, setNewName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!user || isLoading) {
    return <MypageSkeleton />;
  }
  console.log(user);
  // !todo - 추후 handleLogout useCallback으로 메모이제이션 하기
  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      nav("/");
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let avatarUrl = user.avatar_url;

      if (avatarFile) {
        const fileName = `${user.id} - ${Date.now()}`;
        const { error } = await supabase.storage
          .from("avatars")
          .upload(fileName, avatarFile);
        if (error)
          console.log(
            "스토리지에 프로필 이미지를 저장하는데 실패했습니다.",
            error.message
          );

        const {
          data: { publicUrl },
        } = supabase.storage.from("avatars").getPublicUrl(fileName);
        avatarUrl = publicUrl;
      }

      // user테이블 업데이트
      const { error } = await supabase
        .from("users")
        .update({
          name: newName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) {
        console.error("user테이블 업데이트가 실패했습니다", error.message);
        alert("업데이트 실패: " + error.message);
      }

      alert("프로필 업데이트가 완료되었습니다.");
      setUser({
        ...user,
        name: newName,
        avatar_url: avatarFile ? avatarUrl : user.avatar_url,
      });
    } catch (error) {
      console.error(error);
      alert("업데이트 실패");
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-[18px] font-bold h-[40px] leading-[40px]]">
        마이페이지
      </h2>
      <div className="relative w-[100px] h-[100px]  ">
        <div className="w-full h-full rounded-full overflow-hidden">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="미리보기 유저 이미지"
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={user.avatar_url || "img/img_default_profile.png"}
              alt="유저 프로필 이미지"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <label className="absolute bottom-0 right-[-10px] w-8 h-8  rounded-full cursor-pointer">
          <input
            type="file"
            onChange={handleFileChange}
            placeholder="변경"
            className="hidden"
          />
          <img src="/ico/ico_camera.webp" alt="카메라 아이콘 이미지" />
        </label>
      </div>

      <div>
        <p className="text-center text-[18px]">
          <b>{user.name}</b>님 환영합니다.
        </p>
        <p className="text-gray-500 text-[14px]">{user.email}</p>
      </div>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="변경할 닉네임을 입력해주세요"
          className="border border-gray-200 rounded-md h-[40px] w-full pl-4"
        />
        <button
          type="submit"
          className="bg-black text-white h-[40px] rounded-md w-full"
        >
          내 정보 수정
        </button>
      </form>
      <button
        onClick={handleLogout}
        className="border border-gray-300 rounded-md h-[40px] w-full"
      >
        로그아웃
      </button>
    </div>
  );
};
