import { useMutation } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";
import { DbUser } from "../shared/types/user.types";

interface UpdateProfileInput {
  user: DbUser;
  newName: string;
  avatarFile: File | null;
}

export const useProfileUpdate = (setUser: (user: DbUser) => void) => {
  const uploadAvatar = async (file: File, userId: string) => {
    const fileName = `${userId}-${Date.now()}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      throw new Error("프로필 이미지 업로드 실패: " + error.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return publicUrl;
  };

  return useMutation({
    mutationFn: async ({ user, newName, avatarFile }: UpdateProfileInput) => {
      let avatarUrl = user.avatar_url;

      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user.id);
      }

      const { error } = await supabase
        .from("users")
        .update({
          name: newName,
          avatar_url: avatarUrl,
        })
        .eq("id", user.id);

      if (error) {
        throw new Error("프로필 업데이트 실패: " + error.message);
      }

      return {
        name: newName,
        avatar_url: avatarFile ? avatarUrl : user.avatar_url,
      };
    },
    onSuccess: (updatedData, { user }) => {
      setUser({
        ...user,
        ...updatedData,
      });
      alert("프로필 업데이트가 완료되었습니다.");
    },
    onError: (error: Error) => {
      console.error(error);
      alert("업데이트 실패: " + error.message);
    },
  });
};
