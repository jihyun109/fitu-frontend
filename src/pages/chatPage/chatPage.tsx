import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import Header from '../mainPage/components/Header';
import Footer from '../mainPage/components/Footer';
import FriendList, { Friend } from './components/friendList';
import ChatRoomList, { ChatRoom } from './components/chatRoomList';
import defaultImage from '../../assets/images/default_profileImage.png';
import axiosInstance from '../../apis/axiosInstance';

const SERVER_SOCKET_URL = `${process.env.REACT_APP_SERVER_URL}/ws`.replace(/^http/, 'ws');

interface FriendResponse {
  userId: number;
  userName: string;
  profileImageUrl: string | null;
}

interface ChatRoomResponse {
  roomId: number;
  roomName: string;
  lastMessage: string;
  imgUrl: string;
}

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");
    if (!token) return;
    const headers = { Authorization: token };

    const setup = async () => {
      try {
        const [friendRes, roomRes] = await Promise.all([
          axiosInstance.get('/friend', { headers }),
          axiosInstance.get('/api/v2/chat/room/list', { headers }),
        ]);

        const friendList = friendRes.data.friendInfoList.map((f: FriendResponse) => ({
          id: f.userId,
          name: f.userName,
          profileImage: f.profileImageUrl || defaultImage,
        }));
        setFriends(friendList);

        const roomList = roomRes.data.chatRoomList.map((r: ChatRoomResponse) => ({
          id: r.roomId,
          name: r.roomName,
          lastMessage: r.lastMessage,
          profileImage: r.imgUrl || defaultImage,
        }));
        setChatRooms(roomList);

        // 채팅방별 구독: 새 메시지 수신 시 lastMessage 업데이트 후 맨 위로 이동
        const client = new Client({
          brokerURL: SERVER_SOCKET_URL,
          connectHeaders: { Authorization: token },
          onConnect: () => {
            roomList.forEach((room: ChatRoom) => {
              client.subscribe(`/sub/chat/room/${room.id}`, (message) => {
                if (!message.body) return;
                try {
                  const data = JSON.parse(message.body);
                  setChatRooms((prev) => {
                    const idx = prev.findIndex((r) => r.id === data.roomId);
                    if (idx === -1) return prev;
                    const updated = [...prev];
                    updated[idx] = { ...updated[idx], lastMessage: data.message };
                    const [moved] = updated.splice(idx, 1);
                    return [moved, ...updated];
                  });
                } catch (err) {
                  console.error("채팅방 목록 업데이트 에러:", err);
                }
              });
            });
          },
          reconnectDelay: 5000,
        });

        client.activate();
        stompClient.current = client;
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    setup();

    return () => {
      if (stompClient.current?.active) stompClient.current.deactivate();
    };
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
        { headers: { Authorization: token } }
      );

      if (response.data && response.data.id) {
        navigate(`/chatlist/${response.data.id}`);
      } else {
        console.error("채팅 응답없음");
      }
    } catch (error) {
      console.error("채팅 생성 실패:", error);

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
            chatRooms={chatRooms} 
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