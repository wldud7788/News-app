import { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { NewComment } from "../../shared/types/comment.types";
import { useCreateComments } from "../../hooks/useCreateComments";

export const CommentForm = ({ articleId }: { articleId: string }) => {
  const { user } = useAuthContext();
  const [comment, setComment] = useState("");

  const createComment = useCreateComments(articleId);

  const onCreateHander = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("댓글을 입력해주세요");
      return;
    }
    const newComment: NewComment = {
      content: comment,
      article_id: articleId,
      user_id: user?.id,
    };

    createComment.mutate(newComment);
    setComment("");
  };

  return (
    <form onSubmit={onCreateHander}>
      <input
        type="text"
        placeholder="댓글을 입력해주세요"
        className="w-[calc(100%-100px)] border-gray-300 border-1 border p-3 rounded-lg mt-5"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="w-[100px] bg-black p-3 rounded-lg text-white">
        작성
      </button>
    </form>
  );
};
