import { ChangeEvent } from "react";

interface ProfileUpdateFormProps {
  newName: string;
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void;
  setNewName: (value: string) => void;
}
export const ProfileUpdateForm = ({
  newName,
  handleSubmit,
  setNewName,
}: ProfileUpdateFormProps) => {
  return (
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
  );
};
