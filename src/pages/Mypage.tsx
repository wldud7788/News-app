import { useAuthContext } from "../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { MypageSkeleton } from "../components/mypage/MypageSkeleton";
import { useProfileUpdate } from "../hooks/useUpdateProfile";
import { ProfileUpdateForm } from "../components/mypage/ProfileUpdateForm";
import { ProfileInfo } from "../components/mypage/ProfileInfo";

export const Mypage = () => {
  const { user, setUser, logout, isLoading } = useAuthContext();
  const nav = useNavigate();
  const [newName, setNewName] = useState(user?.name || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const updatedProfile = useProfileUpdate(setUser);

  if (!user || isLoading) {
    return <MypageSkeleton />;
  }
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

    updatedProfile.mutate({ user, newName, avatarFile });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-[18px] font-bold h-[40px] leading-[40px]]">
        마이페이지
      </h2>
      <ProfileInfo
        previewUrl={previewUrl}
        handleFileChange={handleFileChange}
      />
      <ProfileUpdateForm
        newName={newName}
        handleSubmit={handleSubmit}
        setNewName={setNewName}
      />
      <button
        onClick={handleLogout}
        className="border border-gray-300 rounded-md h-[40px] w-full"
      >
        로그아웃
      </button>
    </div>
  );
};
