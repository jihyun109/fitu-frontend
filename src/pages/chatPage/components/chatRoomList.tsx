import React from 'react';
import styled from 'styled-components';
import defaultImage from '../../../assets/images/default_profileImage.png';

export interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  profileImage?: string;
}

interface ChatRoomListProps {
  chatRooms: ChatRoom[];
  onRoomClick: (roomId: number) => void;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ chatRooms, onRoomClick }) => {
  return (
    <ChatListContainer>
      {chatRooms.map((chat) => (
        <ChatListItem key={chat.id} onClick={() => onRoomClick(chat.id)}>
          <ProfileAvatar>
            <img src={chat.profileImage || defaultImage} alt={`${chat.name} 프로필`} />
          </ProfileAvatar>
          <ChatTextContainer>
            <ChatName>{chat.name}</ChatName>
            <LastMessage>{chat.lastMessage}</LastMessage>
          </ChatTextContainer>
        </ChatListItem>
      ))}
    </ChatListContainer>
  );
};

export default ChatRoomList;

const ChatListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  &:hover { background-color: #f9f9f9; }
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  flex-shrink: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChatTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatName = styled.span`
  font-size: 16px; 
  font-weight: 600;
  color: #000;
`;

const LastMessage = styled.span`
  font-size: 14px; 
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;