import React from "react";
import { ProfileImageSmall, CommentItem, ReplyButton, EmptyComment } from "./mainDetail.styles";
import defImg from "../../assets/images/default_profileImage.png";

interface CommentData {
  id: number;
  writerName: string;
  writerProfileImgUrl: string;
  rootId: number;
  contents: string;
  createdAt: string;
  isMine: boolean;
  isSecret: boolean;
  replies: CommentData[];
}

interface DetailCommentProps {
  comments: CommentData[];
  onReplyClick: (commentId: number) => void;
  userProfileImgUrl?: string;
}

const DetailComment: React.FC<DetailCommentProps> = ({
  comments,
  onReplyClick,
  userProfileImgUrl,
}) => {
  const renderComment = (comment: CommentData, depth = 0) => (
    <CommentItem key={comment.id} depth={depth}>
      <ProfileImageSmall
        src={comment.writerProfileImgUrl || (comment.isMine ? userProfileImgUrl || defImg : defImg)}
        alt="댓글자"
      />
      <div className="comment-body">
        <div className="comment-header">
          <span className="name">{comment.writerName}</span>
          <span className="date">
            {new Date(comment.createdAt).toLocaleString("ko-KR", {
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p>{comment.contents}</p>
        <ReplyButton onClick={() => onReplyClick(comment.id)}>↳ 답글</ReplyButton>

        {comment.replies?.map(reply => renderComment(reply, depth + 1))}
      </div>
    </CommentItem>
  );

  if (comments.length === 0) return <EmptyComment>아직 댓글이 없습니다.</EmptyComment>;

  return <>{comments.map(c => renderComment(c))}</>;
};

export default DetailComment;