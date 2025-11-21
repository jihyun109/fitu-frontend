import React, { useEffect, useState, useCallback } from "react";
import { Send } from "lucide-react";
import { useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import axiosInstance from "../../apis/axiosInstance";
import DetailComment from "./DetailComment";
import MoreMenu from "./components/MoreMenu";
import {
  Wrapper,
  Header,
  ContentWrapper,
  Post,
  UserInfo,
  ProfileImage,
  PostText,
  CommentList,
  CommentInput,
} from "./styles/mainDetail.styles";
import defImg from "../../assets/images/default_profileImage.png";

interface PostData {
  id: number;
  postCategory: string;
  title: string;
  writerName: string;
  writerProfileImgUrl: string;
  contents: string;
  createdAt: string;
}

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

interface PostDetailResponse {
  post: PostData;
  comments: CommentData[];
}

const addReplyRecursively = (
  comments: CommentData[],
  targetId: number,
  newReply: CommentData
): CommentData[] => {
  return comments.map((c) => {
    if (c.id === targetId) {
      return { ...c, replies: [...(c.replies || []), newReply] };
    }
    if (c.replies && c.replies.length > 0) {
      return {
        ...c,
        replies: addReplyRecursively(c.replies, targetId, newReply),
      };
    }
    return c;
  });
};

const MainDetail: React.FC = () => {
  const { id: postId } = useParams<{ id: string }>();

  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState<number | null>(null);
  const [isSecret, setIsSecret] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostDetail = useCallback(async () => {
    if (!postId) return;
    
    try {
      const res = await axiosInstance.get<PostDetailResponse>(`/api/v2/posts/${postId}`);
      setPost(res.data.post);
      setComments(res.data.comments ?? []);
    } catch (err) {
      console.error(err);
      setError("게시글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) {
      setError("잘못된 접근입니다.");
      setLoading(false);
      return;
    }
    fetchPostDetail();
  }, [fetchPostDetail, postId]);

  const handlePostReport = async () => {
    if (!postId) return;
    if (!window.confirm("이 게시글을 신고하시겠습니까?")) return;

    try {
      await axiosInstance.post("/api/v2/reports", {
        targetId: Number(postId),
        targetType: "POST",
      });
      alert("게시글이 신고되었습니다.");
    } catch (error) {
      console.error(error);
      alert("신고 처리에 실패했습니다.");
    }
  };

  const handlePostDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까? (기능 미구현)")) {
      alert("삭제 버튼 클릭됨 (API 연동 필요)");
    }
  };

  const handleCommentSubmit = async () => {
    if (!postId || !newComment.trim()) return;

    try {
      const res = await axiosInstance.post<CommentData>(
        `/api/v2/posts/${postId}/comments`,
        {
          contents: newComment,
          rootId: replyTarget ?? 0,
          isSecret,
        }
      );

      const newCommentData = res.data;

      setComments((prev) => {
        if (replyTarget) {
          return addReplyRecursively(prev, replyTarget, newCommentData);
        }
        return [...prev, newCommentData];
      });

      setNewComment("");
      setReplyTarget(null);
      setIsSecret(false);
    } catch (err) {
      console.error(err);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  if (loading) return <Wrapper>로딩 중...</Wrapper>;
  if (error) return <Wrapper>{error}</Wrapper>;
  if (!post) return <Wrapper>게시글이 존재하지 않습니다.</Wrapper>;

  return (
    <Wrapper>
      <Header>
        <BackButton>자유게시판</BackButton>
      </Header>

      <ContentWrapper>
        <Post>
          <UserInfo>
            <ProfileImage src={post.writerProfileImgUrl || defImg} alt="프로필" />
            <div className="info">
              <div className="name">{post.writerName}</div>
              <div className="date">
                {new Date(post.createdAt).toLocaleString("ko-KR", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <MoreMenu onReport={handlePostReport} onDelete={handlePostDelete} />
          </UserInfo>

          <PostText>
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </PostText>

          <CommentList>
            <DetailComment
              comments={comments}
              userProfileImgUrl={post.writerProfileImgUrl}
              onReplyClick={setReplyTarget}
              postId={Number(postId)}
              onRefresh={fetchPostDetail}
            />
          </CommentList>
        </Post>
      </ContentWrapper>

      <CommentInput>
        <label>
          <input
            type="checkbox"
            checked={isSecret}
            onChange={(e) => setIsSecret(e.target.checked)}
          />
          비밀
        </label>
        <input
          type="text"
          placeholder={replyTarget ? "답글을 입력해주세요." : "댓글을 입력해주세요."}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Send size={20} color="#17A1FA" onClick={handleCommentSubmit} />
      </CommentInput>
    </Wrapper>
  );
};

export default MainDetail;