import React from "react";
import styled from "styled-components";
import { MoreVertical, Send } from "lucide-react";
import BackButton from "../../components/BackButton";
import defImg from "../../assets/images/default_profileImage.png"

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

const MainDetail = () => {
    const comments: Comment[] = [
        { id: 1, author: "김주민", content: "한국어 연습중이야?", date: "08/12 20:05" },
        { id: 2, author: "김주민", content: "퉁퉁퉁퉁퉁퉁사후르", date: "08/12 20:08" },
        { id: 3, author: "김주민", content: "아아아아아아아아아아아앙아ㅏ", date: "08/12 20:10" },
        { id: 4, author: "김주민", content: "가나다라마바사아자차카타파하", date: "08/12 20:12" },
    ];
  return (
    <Wrapper>
      <Header>
        <BackButton>자유게시판</BackButton>
      </Header>

      <ContentWrapper>
        <Post>
          <UserInfo>
            <ProfileImage1
              src={defImg}
              alt="프로필"
            />
            <div className="info">
              <div className="name">김주민</div>
              <div className="date">08/12 20:00</div>
            </div>
            <MoreVertical size={18} color="black" />
          </UserInfo>

          <PostText>
            <h2>가나다라마바사</h2>
            <p>
              아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하가
            </p>
          </PostText>
        </Post>

        <CommentList>
          {comments.map((comment) => (
            <CommentItem key={comment.id}>
              <div className="left">
                <ProfileImage2
                  src={defImg}
                  alt="프로필"
                />
              </div>
              <div className="right">
                <div className="header">
                  <div className="name">{comment.author}</div>
                  <div className="date">{comment.date}</div>
                  <MoreVertical size={15} color="black" />
                </div>
                <div className="content">{comment.content}</div>
                <ReplyButton>답글</ReplyButton>
              </div>
            </CommentItem>
          ))}
        </CommentList>
      </ContentWrapper>

      <CommentInput>
        <input type="text" placeholder="내용을 입력해주세요." />
        <Send size={20} color="#17A1FA" />
      </CommentInput>
    </Wrapper>
  );
};

export default MainDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  background-color: white;
  padding: 0 16px;
  font-weight: 600;
  border-bottom: 1px solid #D9D9D9;

`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px 80px;
`;

const Post = styled.div`
  background: white;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid #D9D9D9;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;

  .info {
    flex: 1;
  }

  .name {
    font-weight: 600;
    font-size: 14px;
  }

  .date {
    font-size: 12px;
    color: #777;
  }
`;

const ProfileImage1 = styled.img`
  width: 50px;
  height: 50px;
  background: #ddd;
  object-fit: cover;
`;

const ProfileImage2 = styled.img`
  width: 35px;
  height: 35px;
  background: #ddd;
  object-fit: cover;
`;

const PostText = styled.div`
  h3 {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: #333;
    line-height: 1.4;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;

  .right {
    flex: 1;
    background: white;
    border-radius: 10px;
    padding-left: 10px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .name {
    font-weight: 600;
  }

  .date {
    color: rgba(0, 0, 0, 0.4);
  }

  .content {
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const ReplyButton = styled.div`
  width: 30px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  color: black;
  background: #E7E7E7;
  cursor: pointer;
`;

const CommentInput = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 90%;
  background: rgba(23, 161, 250, 0.15);
  border-top: 1px solid #eee;
  padding: 8px 12px;
  margin: 21px 9px;
  display: flex;
  align-items: center;
  gap: 8px;

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
  }
`;