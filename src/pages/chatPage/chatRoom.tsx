import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import BackButton from "../../components/BackButton";
import SendIcon from "../../assets/images/Send.svg";

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
}

const dummyMessages: Message[] = [
  { id: 1, text: '오늘 운동 몇시에 가?', sender: 'other' },
  { id: 2, text: '3시에 가려고', sender: 'me' },
];

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [input, setInput] = useState('');
  
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'me',
    };
    setMessages([...messages, newMessage]);

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
        <BackButton>김주민</BackButton>
      </ChatHeader>

      <MessageArea>
        {messages.map((msg) => (
          <MessageRow key={msg.id} isMine={msg.sender === 'me'}>
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