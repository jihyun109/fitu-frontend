import React from 'react';
import styled from 'styled-components';
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
    { id: 3, text: 'ㅇㅋㅇㅋ', sender: 'other' },
    { id: 4, text: '너도 갈거야?', sender: 'me' },
    { id: 5, text: '응 하체하려고', sender: 'other' },
    { id: 4, text: '그래 3시에 학교 헬스장에서 만나', sender: 'me' },
    { id: 3, text: '오케이', sender: 'other' },

  ];
  
  const ChatDetail: React.FC = () => {
    return (
      <PageContainer>
        <ChatHeader>
          <BackButton>김주민</BackButton>
        </ChatHeader>

        <MessageArea>
          {dummyMessages.map((msg) => (
            <MessageRow key={msg.id} isMine={msg.sender === 'me'}>
              <MessageBubble isMine={msg.sender === 'me'}>
                {msg.text}
              </MessageBubble>
            </MessageRow>
          ))}
        </MessageArea>
  
        <InputArea>
          <ChatInput placeholder="메시지 입력하기" />
          <SendButton>
            <img src={SendIcon} alt="전송" />
          </SendButton>
        </InputArea>
      </PageContainer>
    );
  };
  
  export default ChatDetail;
  
  
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
  
    &:focus {
      outline: none;
    }
  
    &::placeholder {
      color: #999;
    }
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