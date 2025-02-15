import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";
import { UpdateComment, Comment } from "../shared/types/comment.types";
export const useUpdateComment = (article_id: string) => {
  const QUERY_KEY = ["comments", article_id];
  const queryCleint = useQueryClient();

  return useMutation({
    mutationFn: async ({ updateId, content }: UpdateComment) => {
      const { data, error } = await supabase
        .from("comment")
        .update({ content })
        .eq("id", updateId).select(`
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
    onMutate: async ({ updateId, content }: UpdateComment) => {
      await queryCleint.cancelQueries({
        queryKey: QUERY_KEY,
      });

      // 이전값 저장
      const previousComments = queryCleint.getQueryData(QUERY_KEY);

      // 낙관적 업데이트
      queryCleint.setQueryData(QUERY_KEY, (old: Comment[]) =>
        old.map((comment) =>
          comment.id === updateId ? { ...comment, content } : comment
        )
      );
      return { previousComments };
    },

    onError: (error, _, context) => {
      queryCleint.setQueryData(QUERY_KEY, context?.previousComments);
      console.error("댓글 수정 중 오류가 발생했습니다.", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      // 성공 시 댓글 목록 새로고침
      queryCleint.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글이 수정되었습니다.");
    },
  });
};
