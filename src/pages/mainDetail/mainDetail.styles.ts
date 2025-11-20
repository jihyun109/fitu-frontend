import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 50px;
  background: white;
  padding: 0 16px;
  font-weight: 600;
  border-bottom: 1px solid #d9d9d9;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px 80px;
`;

export const Post = styled.div`
  background: white;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
`;

export const UserInfo = styled.div`
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

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  background: #ddd;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileImageSmall = styled.img`
  width: 36px;
  height: 36px;
  background: #ddd;
  border-radius: 50%;
  object-fit: cover;
`;

export const PostText = styled.div`
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

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  border-top: 1px solid #d9d9d9;
  padding-top: 12px;
`;

export const CommentItemWrapper = styled.div<{ $depth?: number }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-left: ${({ $depth }) => ($depth ? 32 : 0)}px;

  .comment-body {
    flex: 1;
  }

  .comment-header {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #555;
    margin-bottom: 4px;
  }

  .name {
    font-weight: 600;
    color: #333;
  }

  .date {
    font-size: 12px;
    color: #777;
    margin-top: 2px;
  }

  p {
    font-size: 13px;
    margin: 0;
  }
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: #17a1fa;
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
  padding: 0;
`;

export const EmptyComment = styled.div`
  text-align: center;
  color: #999;
  font-size: 13px;
  margin-top: 20px;
`;

export const CommentInput = styled.div`
position: fixed;
bottom: 20px;
left: 50%;
transform: translateX(-50%);

width: calc(100% - 32px);

background: #EFF8FF;
background: rgba(23, 161, 250, 0.15); 
backdrop-filter: blur(5px);

border-radius: 20px;
border: 1px solid #eee;

padding: 8px 16px;
display: flex;
align-items: center;
gap: 8px;
box-sizing: border-box;
z-index: 100;

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: #333;
  }

  input[type="text"] {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
  }

  svg {
    cursor: pointer;
  }
`;

export const ReplyContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;