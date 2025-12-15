import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../mainPage/components/Header';
import Footer from '../mainPage/components/Footer';
import FriendList, { Friend } from './components/friendList';
import ChatRoomList, { ChatRoom } from './components/chatRoomList';
import defaultImage from '../../assets/images/default_profileImage.png';
import axiosInstance from '../../apis/axiosInstance';

const dummyChatRooms: ChatRoom[] = [
  { id: 1, name: '김주민', lastMessage: '오늘 운동 몇시에 가?', profileImage: defaultImage },
];

interface FriendResponse {
  userId: number;
  userName: string;
  profileImageUrl: string | null;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const response = await axiosInstance.get('/friend', {
          headers: { Authorization: token }
        });
        
        const friendList = response.data.friendInfoList.map((f: FriendResponse) => ({
          id: f.userId,
          name: f.userName,
          profileImage: f.profileImageUrl || defaultImage
        }));

        setFriends(friendList);
      } catch (error) {
        console.error("친구 목록 불러오기 실패:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleFriendClick = async (friendId: number, friendName: string) => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axiosInstance.post('/api/v2/chat/room', 
        {
          name: friendName, 
          memberIds: [friendId]
        },
        {
          headers: { Authorization: token }
        }
      );

      if (response.data && response.data.id) {
        navigate(`/chatlist/${response.data.id}`);
      } else {
        console.error("채팅방 ID 응답 없음");
      }

    } catch (error) {
      console.error("채팅방 생성 실패:", error);
      alert("채팅방 생성 중 오류가 발생했습니다.");
    }
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/chatlist/${roomId}`); 
  };

  const savedUniverseName = sessionStorage.getItem("universeName");
  const universeName = savedUniverseName || "";

  return (
    <PageContainer>
      <Header name={universeName} />
      <ContentArea>
        <Section>
          <SectionTitle>친구 목록</SectionTitle>
          <FriendList 
            friends={friends} 
            onFriendClick={handleFriendClick} 
          />
        </Section>

        <Section>
          <SectionTitle>채팅</SectionTitle>
          <ChatRoomList 
            chatRooms={dummyChatRooms} 
            onRoomClick={handleRoomClick} 
          />
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