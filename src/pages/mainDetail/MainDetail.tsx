import React, { useEffect, useState, useCallback } from "react";
import { Send } from "lucide-react";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import axiosInstance from "../../apis/axiosInstance";
import DetailComment from "./DetailComment";
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
} from "./mainDetail.styles";
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

const MainDetail: React.FC = () => {
  const params = useParams<{ postId: string }>();
  const location = useLocation();
  const paramPostId = params.postId;

  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTarget, setReplyTarget] = useState<number | null>(null);
  const [isSecret, setIsSecret] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvePostId = useCallback((): string | null => {
    if (paramPostId) return paramPostId;
    const m = location.pathname.match(/\/(\d+)(?:\/?$)/);
    if (m && m[1]) return m[1];
    const urlSearch = new URLSearchParams(location.search);
    return urlSearch.get("postId") ?? urlSearch.get("id");
  }, [paramPostId, location.pathname, location.search]);

  const fetchPostDetail = useCallback(async (idStr: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.get<PostDetailResponse>(`/api/v2/posts/${idStr}`);
      setPost(res.data.post);
      setComments(res.data.comments ?? []);
    } catch (err) {
      console.error(err);
      setError("게시글을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const idResolved = resolvePostId();
    if (!idResolved) {
      setError("잘못된 게시물 주소입니다.");
      setLoading(false);
      return;
    }
    fetchPostDetail(idResolved);
  }, [resolvePostId, fetchPostDetail]);

  const handleCommentSubmit = async () => {
    const idResolved = resolvePostId();
    if (!idResolved || !newComment.trim()) return;

    try {
      const res = await axiosInstance.post<CommentData>(
        `/api/v2/posts/${idResolved}/comments`,
        {
          contents: newComment,
          rootId: replyTarget ?? 0,
          isSecret,
        }
      );

      const newCommentData = res.data;

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
