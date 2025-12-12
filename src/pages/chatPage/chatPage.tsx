import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../mainPage/components/Header';
import Footer from '../mainPage/components/Footer';
import FriendList, { Friend } from './components/friendList';
import ChatRoomList, { ChatRoom } from './components/chatRoomList';
import defaultImage from '../../assets/images/default_profileImage.png';

const dummyFriends: Friend[] = [
  { id: 1, name: '김주민', profileImage: defaultImage },
];

const dummyChatRooms: ChatRoom[] = [
  { id: 1, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
];

const ChatPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRoomClick = (roomId: number) => {
    navigate(`/chatlist/${roomId}`); 
  };

  return (
    <PageContainer>
      <Header name="한세대" />
      <ContentArea>
        <Section>
          <SectionTitle>친구 목록</SectionTitle>
          <FriendList friends={dummyFriends} />
        </Section>

        <Section>
          <SectionTitle>채팅</SectionTitle>
          <ChatRoomList chatRooms={dummyChatRooms} onRoomClick={handleRoomClick} />
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