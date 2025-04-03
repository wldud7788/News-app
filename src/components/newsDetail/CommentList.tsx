import { useReadComment } from "../../hooks/useReadComments";
import { CommentLoading } from "./CommentLoading";
import { CommentCard } from "./CommentCard";

interface CommentListProps {
  articleId: string;
}
export const CommentList = ({ articleId }: CommentListProps) => {
  const { data: comments, isLoading, error } = useReadComment(articleId);
  if (isLoading) {
    return <CommentLoading />;
  }
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }
  return (
    <div className="flex flex-col gap-5 mt-7">
      {comments && comments?.length > 0 ? (
        comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      ) : (
        <div className="h-[100px] bg-gray-100 rounded-lg text-gray-500 text-sm text-center flex justify-center items-center">
          아직 작성된 댓글이 없어요
          <br />
          댓글을 작성해주세요
        </div>
      )}
    </div>
  );
};
