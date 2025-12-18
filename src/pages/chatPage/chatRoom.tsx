import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import SendIcon from "../../assets/images/Send.svg";
import SockJS from "sockjs-client";

const SERVER_SOCKET_URL = 'http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/ws';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  senderName?: string;
}

const ChatRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>(); 
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  const stompClient = useRef<Client | null>(null);
  
  const myName = sessionStorage.getItem("userName") || "나"; 

  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");

    if (!roomId || !token) {
      console.error("필수 정보 누락: roomId 또는 token이 없습니다.");
      return;
    }

    console.log(`연결 시도 - Room: ${roomId}`);

    const client = new Client({
      webSocketFactory: () => new SockJS(SERVER_SOCKET_URL),
      
      connectHeaders: {
        Authorization: token, 
      },
      
      debug: (str) => console.log('STOMP Debug:', str),

      onConnect: () => {
        console.log('SockJS 연결 성공!');

        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          if (message.body) {
            try {
              const receivedMsg = JSON.parse(message.body);
              const isMe = receivedMsg.sender === myName;

              const newMessage: Message = {
                id: Date.now(),
                text: receivedMsg.message,
                sender: isMe ? 'me' : 'other',
                senderName: receivedMsg.sender
              };
              setMessages((prev) => [...prev, newMessage]);
            } catch (err) {
              console.error("메시지 파싱 실패:", err);
            }
          }
        });
      },

      onStompError: (frame) => {
        console.error('STOMP 에러:', frame);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (client.active) client.deactivate();
    };
  }, [roomId, myName]);

  const handleSendMessage = () => {
    if (!input.trim() || !stompClient.current?.connected) return;

    const payload = {
      roomId: Number(roomId),
      message: input,
      sender: myName,
    };

    stompClient.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify(payload),
    });

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSendMessage();
    }
  };

  return (
    <PageContainer>
      <ChatHeader>
        <BackButton>채팅방</BackButton>
      </ChatHeader>

      <MessageArea>
        {messages.map((msg, index) => (
          <MessageRow key={index} isMine={msg.sender === 'me'}>
            <MessageBubble isMine={msg.sender === 'me'}>
              {msg.text}
            </MessageBubble>
          </MessageRow>
        ))}
      </MessageArea>

      <InputArea>
        <ChatInput 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지 입력하기" 
        />
        <SendButton onClick={handleSendMessage}>
          <img src={SendIcon} alt="전송" />
        </SendButton>
      </InputArea>
    </PageContainer>
  );
};

export default ChatRoom;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;
const ChatHeader = styled.header`
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #f0f0f0;
`;
const MessageArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MessageRow = styled.div<{ isMine: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMine ? 'flex-end' : 'flex-start')};
`;
const MessageBubble = styled.div<{ isMine: boolean }>`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 15px;
  background-color: ${(props) => (props.isMine ? '#17A1FA' : '#f0f2f5')};
  color: ${(props) => (props.isMine ? '#ffffff' : '#000000')};
  word-break: break-word;
`;
const InputArea = styled.footer`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 20px;
`;
const ChatInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 16px;
  border: none;
  border-radius: 20px;
  background-color: #f0f2f5;
  font-size: 15px;
  &:focus { outline: none; }
  &::placeholder { color: #999; }
`;
const SendButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0 0 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;