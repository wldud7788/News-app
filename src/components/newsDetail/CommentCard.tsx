import { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { Comment } from "../../shared/types/comment.types";
import { useUpdateComment } from "../../hooks/useUpdateComment";
import { useDeleteComment } from "../../hooks/useDeleteComment";
interface CommentCardProps {
  comment: Comment;
}
export const CommentCard = ({ comment }: CommentCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { user } = useAuthContext();
  const deleteComment = useDeleteComment(comment.article_id);

  const updateComment = useUpdateComment(comment.article_id);

  const onDeleteHandler = async (id: number) => {
    const confirmDelete = confirm("댓글을 삭제하시겠습니까?");
    if (confirmDelete) {
      deleteComment.mutate(id);
    }
  };
  const onUpdateHandler = async (id: number) => {
    const confirmUpdate = confirm("댓글을 수정하시겠습니까?");
    if (confirmUpdate) {
      updateComment.mutate({
        updateId: id,
        content: newComment,
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg relative">
        <div className="flex gap-5 items-center mb-3">
          <img
            src={comment.profiles.avatar_url}
            alt="프로필 이미지"
            className="rounded-full w-[50px] h-[50px] object-cover flex-shrink-0"
          />
          <div>
            <p className="font-medium">{comment.profiles.email}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        {!isEditing ? (
          <>
            <p className="pl-[65px]">{comment.content}</p>
            {comment.user_id === user?.id && (
              <div className="flex justify-end">
                <button onClick={() => setIsEditing(true)} className="mr-3">
                  수정
                </button>
                <span className="mr-3">|</span>
                <button onClick={() => onDeleteHandler(comment.id)}>
                  삭제
                </button>
              </div>
            )}
          </>
        ) : (
          <div>
            <textarea
              className="w-full min-h-[100px] p-3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="수정할 내용 입력"
            />
            <div className="flex justify-end">
              <button
                onClick={() => onUpdateHandler(comment.id)}
                className="className mr-3"
              >
                수정
              </button>
              <span className="mr-3">|</span>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setNewComment("");
                }}
              >
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
