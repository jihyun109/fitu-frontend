import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import BackButton from "../../components/BackButton";
import SendIcon from "../../assets/images/Send.svg";
import axiosInstance, { refreshClient } from '../../apis/axiosInstance';
import DefaultProfile from "../../assets/images/default_profileImage.png";

// WebSocket 서버 주소. http → ws, https → wss로 변환
const SERVER_SOCKET_URL = `${process.env.REACT_APP_SERVER_URL}/ws`.replace(/^http/, 'ws');

// 한 번에 가져오는 메시지 수 (백엔드 페이지네이션 limit과 맞춤)
const MESSAGE_PAGE_SIZE = 50;

// ============================================================
// 타입 정의
// ============================================================

/** 화면에 표시되는 메시지 */
interface Message {
  id: number | string;
  text: string;
  sender: 'me' | 'other';    // 내가 보낸 메시지인지 여부
  senderName: string;
  senderProfile: string;
  time?: string;              // 서버에서 받은 전송 시각 (페이지네이션 커서로 사용)
}

/** 서버 API 응답의 메시지 항목 */
interface ServerHistoryItem {
  senderName: string;
  message: string;
  senderProfileUrl: string;
  sendTime: string;
  senderId: number;
}

/** 서버 API 응답 전체 형태 */
interface HistoryResponse {
  messages: ServerHistoryItem[];
}

// ============================================================
// 유틸리티 함수 (컴포넌트 밖에 선언 — 렌더링마다 재생성되지 않음)
// ============================================================

/** 서버 응답 메시지 → 화면용 Message 객체로 변환 */
const toMessage = (
  item: ServerHistoryItem,
  index: number,
  myUserId: string | null,
  myName: string,
  prefix: string       // 메시지 id 충돌 방지용 접두사 (history, older, missed 등)
): Message => {
  // 내가 보낸 메시지인지 판별: userId 비교 우선, 없으면 이름으로 비교
  const isMe = myUserId
    ? String(item.senderId) === String(myUserId)
    : item.senderName === myName;

  return {
    id: `${prefix}-${index}-${item.sendTime}`,
    text: item.message,
    sender: isMe ? 'me' : 'other',
    senderName: item.senderName,
    senderProfile: item.senderProfileUrl || DefaultProfile,
    time: item.sendTime,
  };
};

/**
 * access token 만료 시 refresh token으로 새 토큰을 발급받는다.
 * 성공하면 새 토큰 반환, 실패하면 null 반환.
 */
const tryRefreshToken = async (): Promise<string | null> => {
  try {
    const res = await refreshClient.get("/auth/reissue");
    const newToken = res.data?.accessToken;
    if (newToken) {
      sessionStorage.setItem("Authorization", newToken);
      return newToken;
    }
  } catch (e) {
    console.error("토큰 갱신 실패:", e);
  }
  return null;
};

// ============================================================
// 프로필 이미지 컴포넌트 (이미지 로드 실패 시 기본 이미지로 대체)
// ============================================================

const SenderProfileImg: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src || DefaultProfile);
  return (
    <ProfileImg
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(DefaultProfile)}
    />
  );
};

// ============================================================
// ChatRoom 메인 컴포넌트
// ============================================================

const ChatRoom: React.FC = () => {
  // URL 파라미터에서 채팅방 ID 추출 (예: /chat/room/3 → roomId = "3")
  const { roomId } = useParams<{ roomId: string }>();

  // --- React 상태(state) ---
  // useState: 값이 바뀌면 화면이 자동으로 다시 그려진다 (리렌더링)
  const [messages, setMessages] = useState<Message[]>([]);       // 현재 표시 중인 메시지 목록
  const [input, setInput] = useState('');                         // 입력창의 텍스트
  const [hasMore, setHasMore] = useState(true);                   // 이전 메시지가 더 있는지 여부
  const [loadingMore, setLoadingMore] = useState(false);          // 이전 메시지 로딩 중 여부 (중복 요청 방지)

  // --- React ref ---
  // useRef: 값이 바뀌어도 리렌더링을 일으키지 않는 저장소. DOM 요소 참조에도 사용.
  const stompClient = useRef<Client | null>(null);                // STOMP 클라이언트 인스턴스
  const lastMessageTimestampRef = useRef<string | null>(null);    // 마지막으로 받은 메시지 시각 (재연결 시 누락 메시지 기준점)
  const isReconnectRef = useRef<boolean>(false);                  // 첫 연결인지 재연결인지 구분
  const messageAreaRef = useRef<HTMLDivElement>(null);             // 메시지 스크롤 영역 DOM 참조

  // sessionStorage에서 로그인한 사용자 정보 가져오기
  const myName = sessionStorage.getItem("userName") || "나";
  const myUserId = sessionStorage.getItem("userid");

  // ============================================================
  // 1. 채팅방 입장 시 최신 메시지 50건 로드
  // ============================================================
  // useEffect: 컴포넌트가 화면에 나타날 때(마운트) 실행된다.
  // [roomId, myName, myUserId]가 바뀔 때도 다시 실행된다.
  useEffect(() => {
    const fetchHistory = async () => {
      if (!roomId) return;
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        // 백엔드: GET /api/v2/chat/message/{roomId}?limit=50
        // 최신 50건을 시간순으로 반환
        const response = await axiosInstance.get<HistoryResponse>(
          `/api/v2/chat/message/${roomId}?limit=${MESSAGE_PAGE_SIZE}`,
          { headers: { Authorization: token } }
        );

        // 서버 응답을 화면용 Message 객체로 변환
        const historyData = response.data.messages.map((item, index) =>
          toMessage(item, index, myUserId, myName, 'history')
        );

        setMessages(historyData);

        // 50건 미만으로 왔으면 더 이상 이전 메시지가 없다는 의미
        setHasMore(response.data.messages.length >= MESSAGE_PAGE_SIZE);

        // 마지막 메시지 시각 저장 (재연결 시 이 시각 이후 메시지만 요청하기 위해)
        if (response.data.messages.length > 0) {
          lastMessageTimestampRef.current = response.data.messages.at(-1)!.sendTime;
        }
      } catch (error) {
        console.error("채팅 내역 조회 실패:", error);
      }
    };

    fetchHistory();
  }, [roomId, myName, myUserId]);

  // ============================================================
  // 2. 스크롤을 위로 올릴 때 이전 메시지 50건 추가 로드
  // ============================================================
  // useCallback: 함수를 메모이제이션한다. 의존성이 바뀔 때만 새 함수가 생성된다.
  // (매 렌더링마다 새 함수를 만들지 않아서 성능에 유리)
  const loadOlderMessages = useCallback(async () => {
    // 더 이상 메시지가 없거나, 이미 로딩 중이거나, 메시지가 아예 없으면 무시
    if (!roomId || !hasMore || loadingMore || messages.length === 0) return;

    // 현재 화면에서 가장 오래된 메시지의 시각을 커서로 사용
    const oldestTime = messages[0]?.time;
    if (!oldestTime) return;

    setLoadingMore(true);
    try {
      // 백엔드: GET /api/v2/chat/message/{roomId}?before={시각}&limit=50
      // 해당 시각 이전의 메시지 50건을 반환
      const response = await axiosInstance.get<HistoryResponse>(
        `/api/v2/chat/message/${roomId}?before=${encodeURIComponent(oldestTime)}&limit=${MESSAGE_PAGE_SIZE}`
      );

      if (response.data.messages.length === 0) {
        setHasMore(false);
        return;
      }

      const olderMessages = response.data.messages.map((item, index) =>
        toMessage(item, index, myUserId, myName, 'older')
      );

      setHasMore(response.data.messages.length >= MESSAGE_PAGE_SIZE);

      // 스크롤 위치 유지: 이전 메시지를 앞에 붙이면 스크롤이 맨 위로 점프하는데,
      // 추가 전 스크롤 높이를 기억했다가 추가 후 그만큼 아래로 밀어준다.
      const area = messageAreaRef.current;
      const prevScrollHeight = area?.scrollHeight || 0;

      setMessages(prev => [...olderMessages, ...prev]);

      // requestAnimationFrame: 브라우저가 화면을 다시 그린 직후에 실행
      requestAnimationFrame(() => {
        if (area) {
          area.scrollTop = area.scrollHeight - prevScrollHeight;
        }
      });
    } catch (error) {
      console.error("이전 메시지 로드 실패:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [roomId, hasMore, loadingMore, messages, myUserId, myName]);

  // 스크롤 이벤트 핸들러: 맨 위 근처(50px 이내)에 도달하면 이전 메시지 로드
  const handleScroll = useCallback(() => {
    const area = messageAreaRef.current;
    if (!area) return;
    if (area.scrollTop < 50 && hasMore && !loadingMore) {
      loadOlderMessages();
    }
  }, [loadOlderMessages, hasMore, loadingMore]);

  // ============================================================
  // 3. STOMP WebSocket 연결 (실시간 메시지 수신)
  // ============================================================
  useEffect(() => {
    const token = sessionStorage.getItem("Authorization");
    if (!roomId || !token) {
      console.error("오류");
      return;
    }

    const client = new Client({
      brokerURL: SERVER_SOCKET_URL,
      // STOMP CONNECT 시 서버에 보내는 헤더 (서버의 WebSocketAuthChannelInterceptor가 검증)
      connectHeaders: { Authorization: token },
      // heartbeat: 서버(25초)와 동일하게 설정. 서로 25초마다 핑/퐁을 교환하여 죽은 연결 감지.
      heartbeatIncoming: 25000,
      heartbeatOutgoing: 25000,

      // --- 연결 성공 시 콜백 ---
      onConnect: () => {
        // (a) 채팅방 메시지 구독: 서버가 /sub/chat/room/{roomId}로 보내는 메시지를 수신
        client.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          if (!message.body) return;
          try {
            const receivedMsg = JSON.parse(message.body);
            const isMe = myUserId ? String(receivedMsg.senderId) === String(myUserId) : false;

            const newMessage: Message = {
              id: Date.now(),
              text: receivedMsg.message,
              sender: isMe ? 'me' : 'other',
              senderName: receivedMsg.senderName || "알 수 없음",
              senderProfile: receivedMsg.senderProfileUrl || DefaultProfile,
            };

            if (receivedMsg.sendTime) {
              lastMessageTimestampRef.current = receivedMsg.sendTime;
            }

            // 기존 메시지 배열 끝에 새 메시지 추가 → 화면이 자동으로 업데이트됨
            setMessages((prev) => [...prev, newMessage]);
          } catch (err) {
            console.error("메시지 파싱 에러:", err);
          }
        });

        // (b) 에러 구독: 서버의 @MessageExceptionHandler가 보내는 에러 수신
        client.subscribe('/user/queue/errors', (errorMessage) => {
          console.error('[STOMP] 서버 에러:', errorMessage.body);
        });

        // (c) 재연결 시 누락 메시지 보충
        // 첫 연결이 아니고(isReconnect=true), 마지막 메시지 시각이 있으면
        // 그 시각 이후에 서버에 저장된 메시지를 가져와서 빈 구간을 채운다.
        if (isReconnectRef.current && lastMessageTimestampRef.current) {
          const currentToken = sessionStorage.getItem("Authorization");
          axiosInstance.get<HistoryResponse>(
            `/api/v2/chat/message/${roomId}?after=${encodeURIComponent(lastMessageTimestampRef.current)}`,
            { headers: { Authorization: currentToken } }
          ).then(response => {
            if (response.data.messages.length === 0) return;

            const missed = response.data.messages.map((item, index) =>
              toMessage(item, index, myUserId, myName, 'missed')
            );

            setMessages(prev => [...prev, ...missed]);
            lastMessageTimestampRef.current = response.data.messages.at(-1)!.sendTime;
          }).catch(err => {
            console.error("누락 메시지 fetch 실패:", err);
          });
        }

        // 다음 연결부터는 "재연결"로 간주
        isReconnectRef.current = true;
      },

      // --- STOMP 에러 시 콜백 (JWT 만료 등) ---
      // 서버가 SEND를 거부하면 이 콜백이 호출된다.
      // refresh token으로 새 access token을 받아서 재연결을 시도한다.
      onStompError: async (frame) => {
        console.error('[STOMP] 에러 프레임:', frame.headers['message']);
        const newToken = await tryRefreshToken();
        if (newToken && client.connected === false) {
          client.connectHeaders = { Authorization: newToken };
          client.activate();
        }
      },

      // 연결 끊김 후 자동 재연결 대기 시간 (5초)
      reconnectDelay: 5000,
    });

    // WebSocket 연결 시작
    client.activate();
    stompClient.current = client;

    // 컴포넌트가 화면에서 사라질 때(언마운트) WebSocket 연결 해제
    return () => {
      if (client.active) client.deactivate();
    };
  }, [roomId, myName, myUserId]);

  // ============================================================
  // 4. 메시지 전송
  // ============================================================
  const handleSendMessage = () => {
    // 빈 입력이거나 WebSocket이 연결되지 않은 상태면 무시
    if (!input.trim() || !stompClient.current?.connected) return;

    // STOMP SEND: /pub/chat/message로 메시지를 서버에 전송
    // 서버의 MessageController.message()가 이를 수신한다
    stompClient.current.publish({
      destination: '/pub/chat/message',
      body: JSON.stringify({
        roomId: Number(roomId),
        message: input,
      }),
    });

    setInput('');
  };

  // Enter 키로 메시지 전송 (한글 조합 중에는 전송하지 않음)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSendMessage();
    }
  };

  // ============================================================
  // 5. 화면 렌더링 (JSX)
  // ============================================================
  return (
    <PageContainer>
      <ChatHeader>
        <BackButton>채팅방</BackButton>
      </ChatHeader>

      {/* onScroll: 스크롤할 때마다 handleScroll 호출 → 맨 위 근처면 이전 메시지 로드 */}
      <MessageArea ref={messageAreaRef} onScroll={handleScroll}>
        {loadingMore && <LoadingText>이전 메시지 불러오는 중...</LoadingText>}
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <MessageRow key={msg.id || index} $isMine={msg.sender === 'me'}>
              {msg.sender !== 'me' && (
                <ProfileWrapper>
                  <SenderProfileImg src={msg.senderProfile || DefaultProfile} alt={msg.senderName} />
                  <SenderName>{msg.senderName}</SenderName>
                </ProfileWrapper>
              )}
              <MessageBubble $isMine={msg.sender === 'me'}>
                {msg.text}
              </MessageBubble>
            </MessageRow>
          ))
        ) : (
          <EmptyState>대화 내용이 없습니다.</EmptyState>
        )}
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

// ============================================================
// styled-components (CSS를 JS 안에서 작성하는 방식)
// ============================================================

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
  gap: 16px;
`;
const MessageRow = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isMine ? 'flex-end' : 'flex-start')};
  width: 100%;
`;
const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  margin-left: 4px;
`;
const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #eee;
  background-color: #f0f0f0;
`;
const SenderName = styled.span`
  font-size: 13px;
  color: #555;
`;
const MessageBubble = styled.div<{ $isMine: boolean }>`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  border-top-left-radius: ${(props) => (!props.$isMine ? '4px' : '16px')};
  border-top-right-radius: ${(props) => (props.$isMine ? '4px' : '16px')};
  font-size: 15px;
  background-color: ${(props) => (props.$isMine ? '#17A1FA' : '#f0f2f5')};
  color: ${(props) => (props.$isMine ? '#ffffff' : '#000000')};
  word-break: break-word;
  line-height: 1.4;
`;
const InputArea = styled.footer`
  display: flex;
  align-items: center;
  padding: 10px 16px 20px 16px;
  border-top: 1px solid #f0f0f0;
  background-color: #fff;
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
const EmptyState = styled.div`
  text-align: center;
  color: #999;
  margin-top: 50px;
  font-size: 14px;
`;
const LoadingText = styled.div`
  text-align: center;
  color: #999;
  font-size: 13px;
  padding: 8px 0;
`;
