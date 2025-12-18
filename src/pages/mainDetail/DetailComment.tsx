import React from "react";
import axiosInstance from "../../apis/axiosInstance";
import MoreMenu from "./components/MoreMenu";
import { Lock } from "lucide-react";
import {
  ProfileImageSmall,
  CommentItemWrapper,
  ReplyButton,
  EmptyComment,
  ReplyContainer,
} from "./styles/mainDetail.styles";
import defImg from "../../assets/images/default_profileImage.png";

interface CommentData {
  id: number;
  currentUserId: number;
  writerId: number;
  writerName: string;
  writerProfileImgUrl: string | null;
  rootId: number;
  contents: string;
  createdAt: string;
  isMine: boolean;
  isSecret: boolean;
  replies: CommentData[] | null;
}

interface DetailCommentProps {
  comments: CommentData[];
  onReplyClick: (commentId: number) => void;
  userProfileImgUrl?: string;
  postId: number;
  onRefresh: () => void;
}

const SingleCommentItem: React.FC<{
  comment: CommentData;
  depth: number;
  onReplyClick: (id: number) => void;
  userProfileImgUrl?: string;
  postId: number;
  onRefresh: () => void;
}> = ({ comment, depth, onReplyClick, userProfileImgUrl, postId, onRefresh }) => {
  const safeDepth = Math.min(depth, 1);

  const isPostOwner = comment.isMine; 
  const isCommentWriter = comment.currentUserId === comment.writerId;
  
  const canShowContent = !comment.isSecret || isPostOwner || isCommentWriter;

  const handleReport = async () => {
    if (!window.confirm("이 댓글을 신고하시겠습니까?")) return;
    try {
      await axiosInstance.post("/api/v2/reports", {
        targetId: comment.id,
        targetType: "COMMENT",
      });
      alert("댓글이 신고되었습니다.");
    } catch (error) {
      console.error(error);
      alert("신고 처리에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/api/v2/posts/${postId}/comments/${comment.id}`);
      
      alert("댓글이 삭제되었습니다.");
      onRefresh();
    } catch (error) {
      console.error(error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      <CommentItemWrapper $depth={safeDepth}>
        <ProfileImageSmall
          src={
            comment.writerProfileImgUrl || defImg
          }
          alt="댓글자"
        />
        <div className="comment-body">
          <div className="comment-header">
            <div className="info-wrapper">
              <span className="name">{comment.writerName}</span>
              <span className="date">
                {new Date(comment.createdAt).toLocaleString("ko-KR", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",

                })}
              </span>
              {comment.isSecret && (
                <Lock
                  size={12}
                  strokeWidth={2}
                  color="#777"
                  style={{ marginTop: "2px" }}
                />
              )}
            </div>
            <MoreMenu
              onReport={handleReport}
              onDelete={isCommentWriter ? handleDelete : undefined}
            />
          </div>

          {canShowContent ? (
            <p>{comment.contents}</p>
          ) : (
            <p
              style={{
                color: "#888",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Lock size={14} /> 비밀 댓글입니다.
            </p>
          )}

          {canShowContent && (
            <ReplyButton onClick={() => onReplyClick(comment.id)}>
              ↳ 답글
            </ReplyButton>
          )}
        </div>
      </CommentItemWrapper>

      {comment.replies && comment.replies.length > 0 && (
        <ReplyContainer>
          {comment.replies.map((reply) => (
            <SingleCommentItem
              key={reply.id}
              comment={reply}
              depth={safeDepth + 1}
              onReplyClick={onReplyClick}
              userProfileImgUrl={userProfileImgUrl}
              postId={postId}
              onRefresh={onRefresh}
            />
          ))}
        </ReplyContainer>
      )}
    </div>
  );
};

const DetailComment: React.FC<DetailCommentProps> = ({
  comments,
  onReplyClick,
  userProfileImgUrl,
  postId,
  onRefresh,
}) => {
  if (!comments || comments.length === 0)
    return <EmptyComment>아직 댓글이 없습니다.</EmptyComment>;

  return (
    <>
      {comments.map((comment) => (
        <SingleCommentItem
          key={comment.id}
          comment={comment}
          depth={0}
          onReplyClick={onReplyClick}
          userProfileImgUrl={userProfileImgUrl}
          postId={postId}
          onRefresh={onRefresh}
        />
      ))}
    </>
  );
};

export default DetailComment;