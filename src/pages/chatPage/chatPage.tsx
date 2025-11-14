import React from 'react';
import styled from 'styled-components';
import Header from '../mainPage/components/Header';
import Footer from '../mainPage/components/Footer';
import defaultImage from '../../assets/images/default_profileImage.png';

interface Friend {
  id: number;
  name: string;
  profileImage?: string;
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  profileImage?: string;
}

const dummyFriends: Friend[] = [
  { id: 1, name: '김주민', profileImage: defaultImage },
  { id: 2, name: '김주민', profileImage: defaultImage },
  { id: 3, name: '김주민', profileImage: defaultImage },
  { id: 4, name: '김주민', profileImage: defaultImage },
  { id: 5, name: '김주민', profileImage: defaultImage },
  { id: 6, name: '김주민', profileImage: defaultImage },
  { id: 7, name: '김주민', profileImage: defaultImage },
];

const dummyChatRooms: ChatRoom[] = [
  { id: 1, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 2, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 3, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 3, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 3, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 3, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
  { id: 4, name: '김주민', lastMessage: '친구와 채팅을 시작해보세요', profileImage: defaultImage },
];
const ChatPage: React.FC = () => {
  return (
    <PageContainer>
      <Header name="한세대" />
      <ContentArea>
        <Section>
          <SectionTitle>친구 목록</SectionTitle>
          <FriendsListContainer>
            {dummyFriends.map((friend) => (
              <FriendItem key={friend.id}>
                <ProfileAvatar>
                  <img src={friend.profileImage || defaultImage} alt={`${friend.name} 프로필`} />
                </ProfileAvatar>
                <ProfileName>{friend.name}</ProfileName>
              </FriendItem>
            ))}
          </FriendsListContainer>
        </Section>

        <Section>
          <SectionTitle>채팅</SectionTitle>
          <ChatListContainer>
            {dummyChatRooms.map((chat) => (
              <ChatListItem key={chat.id}>
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
        </Section>
      </ContentArea>
      <Footer />
    </PageContainer>
  );
};

export default ChatPage;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f2f5;
`;

const ContentArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const Section = styled.section`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 18px; 
  font-weight: 600;
  margin: 0 0 16px 0;
`;

const FriendsListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 8px;
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  gap: 8px;
`;

const ProfileAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.span`
  font-size: 14px; 
  color: #333;
`;

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

  &:hover {
    background-color: #f9f9f9;
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
`;