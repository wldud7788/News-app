import { useReadComment } from "../../hooks/useReadComments";
import { CommentCard } from "./CommentCard";

interface CommentListProps {
  articleId: string;
}
export const CommentList = ({ articleId }: CommentListProps) => {
  const { data: comments, isLoading, error } = useReadComment(articleId);
  if (isLoading) {
    return <div>로딩중..</div>;
  }
  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }
  return (
    <div className="flex flex-col gap-5 mt-7">
      {comments?.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
