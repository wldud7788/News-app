import { ChangeEvent } from "react";
import { useAuthContext } from "../../context/useAuthContext";
interface ProfileInfoProps {
  previewUrl: string | null;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const ProfileInfo = ({
  previewUrl,
  handleFileChange,
}: ProfileInfoProps) => {
  const { user } = useAuthContext();
  return (
    <>
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
              src={user?.avatar_url || "img/img_default_profile.png"}
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
          <b>{user?.name}</b>님 환영합니다.
        </p>
        <p className="text-gray-500 text-[14px]">{user?.email}</p>
      </div>
    </>
  );
};
