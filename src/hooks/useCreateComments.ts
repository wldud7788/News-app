import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";
import { NewComment } from "../shared/types/comment.types";
import { useAuthContext } from "../context/useAuthContext";

export const useCreateComments = (article_id: string) => {
  const { user } = useAuthContext();
  const QUERY_KEY = ["comments", article_id];
  const queryCleint = useQueryClient();

  return useMutation({
    mutationFn: async (newComment: NewComment) => {
      const { data, error } = await supabase
        .from("comment")
        .insert([newComment]).select(`
            *,
            profiles:user_id (
              avatar_url,
              email
            )
          `);
      if (error) {
        throw error;
      }
      return data;
    },
    onMutate: async (newComment: NewComment) => {
      // 낙관적 업데이트를 위해 진행 중인 쿼리 취소
      await queryCleint.cancelQueries({
        queryKey: QUERY_KEY,
      });

      // 이전 상태 저장
      const previousComments = queryCleint.getQueryData(QUERY_KEY) || [];

      // 새 댓글 추가
      queryCleint.setQueryData(QUERY_KEY, (old: Comment[]) => [
        ...old,
        {
          ...newComment,
          id: Date.now(), // 임시아이디
          created_at: new Date().toISOString(),
          profiles: {
            avatar_url: user?.avatar_url, // 현재 로그인한 사용자의 정보
            email: user?.email,
          },
        },
      ]);

      return { previousComments };
    },

    onError: (error, _, context) => {
      // 에러 발생 시 이전 상태로 복구
      queryCleint.setQueryData(QUERY_KEY, context?.previousComments);
      console.error("댓글 작성 중 오류가 발생했습니다.", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      // 성공 시 댓글 목록 새로고침
      queryCleint.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글이 작성되었습니다.");
    },
  });
};
