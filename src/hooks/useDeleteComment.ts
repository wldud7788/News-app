import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase/supabaseClient";
import { Comment } from "../shared/types/comment.types";

export const useDeleteComment = (article_id: string) => {
  const QUERY_KEY = ["comments", article_id];
  const queryCleint = useQueryClient();
  return useMutation({
    mutationFn: async (deletId: number) => {
      const { data, error } = await supabase
        .from("comment")
        .delete()
        .eq("id", deletId)
        .select();

      if (error) {
        throw error;
      }
      return data;
    },

    onMutate: async (deletId: number) => {
      // 해당 게시글의 댓글 쿼리를 취소
      await queryCleint.cancelQueries({
        queryKey: QUERY_KEY,
      });
      // 이전값 저장
      const previousComments = queryCleint.getQueryData(QUERY_KEY);

      // deleteId에 해당하는 댓글을 제거
      queryCleint.setQueryData(QUERY_KEY, (old: Comment[]) =>
        old?.filter((comment) => comment.id !== deletId)
      );

      // deleteId가 제거된 이전값 반환
      return { previousComments };
    },

    onError: (error, _, context) => {
      // 에러 발생 시 백업해둔 이전 데이터로 복원
      queryCleint.setQueryData(
        QUERY_KEY,
        // context는 onMuatate에서 return한 객체
        context?.previousComments // 백업해둔 데이터
      );
      console.error("댓글 삭제 중 오류가 발생했습니다.", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      queryCleint.invalidateQueries({
        queryKey: QUERY_KEY,
      });
      alert("댓글 삭제 완료");
    },
  });
};
