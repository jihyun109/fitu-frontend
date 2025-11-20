import React from "react";
import {
  ProfileImageSmall,
  CommentItemWrapper,
  ReplyButton,
  EmptyComment,
  ReplyContainer,
} from "./mainDetail.styles";
import defImg from "../../assets/images/default_profileImage.png";

interface CommentData {
  id: number;
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
}

const SingleCommentItem: React.FC<{
  comment: CommentData;
  depth: number;
  onReplyClick: (id: number) => void;
  userProfileImgUrl?: string;
}> = ({ comment, depth, onReplyClick, userProfileImgUrl }) => {
  const safeDepth = Math.min(depth, 1);

  return (
    <div>
      <CommentItemWrapper $depth={safeDepth}>
        <ProfileImageSmall
          src={
            comment.writerProfileImgUrl ||
            (comment.isMine ? userProfileImgUrl || defImg : defImg)
          }
          alt="댓글자"
        />
        <div className="comment-body">
          <div className="comment-header">
            <span className="name">{comment.writerName}</span>
            <span className="date">
              {new Date(comment.createdAt).toLocaleString("ko-KR", {
                month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",
              })}
            </span>
          </div>
          <p>{comment.contents}</p>
          <ReplyButton onClick={() => onReplyClick(comment.id)}>
            ↳ 답글
          </ReplyButton>
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
        />
      ))}
    </>
  );
};

export default DetailComment;