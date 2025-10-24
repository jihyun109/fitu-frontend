import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackButton from "../../../components/BackButton";
import axiosInstance from "../../../apis/axiosInstance";

const Container = styled.div`
  padding: 24px;
  min-height: 800px;
  background-color: white;
`;

const Section = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  margin-top: 15%;
  margin-bottom: 24px;
`;

const Section2 = styled.div`
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const CodeBox = styled.div`
  font-size: 20px;
  text-align: center;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: calc(100% - 100px);
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-left: 8px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #06b6d4;
  }
`;

export default function InvitePage() {
  const [myCode, setMyCode] = useState<string>("");
  const [friendCode, setFriendCode] = useState<string>("");

  useEffect(() => {
    const fetchMyCode = async () => {
      try {
        const res = await axiosInstance.get("/api/v2/users/friend-code");
        setMyCode(res.data.friendCode || "");
      } catch (err) {
        console.error("초대 코드 불러오기 실패:", err);
        alert("초대 코드를 불러오지 못했습니다.");
      }
    };

    fetchMyCode();
  }, []);

  const copyCode = () => {
    if (!myCode) return alert("초대 코드가 없습니다.");
    navigator.clipboard.writeText(myCode);
    alert("초대 코드가 복사되었습니다!");
  };

  const addFriendCode = async () => {
    if (!friendCode.trim()) return alert("코드를 입력하세요.");

    try {
      alert(`친구 초대 코드 ${friendCode} 추가 요청`);
      setFriendCode("");
    } catch (err) {
      console.error("친구 추가 에러:", err);
      alert("친구 초대에 실패했습니다.");
    }
  };

  return (
    <Container>
      <BackButton>친구 초대 코드</BackButton>

      <Section>
        <Title>
          초대 코드로
          <br />
          친구를 초대하세요.
        </Title>

        <p>초대코드</p>

        <div style={{ display: "flex" }}>
          <Input
            value={friendCode}
            onChange={(e) => setFriendCode(e.target.value)}
            placeholder="초대 코드 입력"
          />
          <Button onClick={addFriendCode}>추가</Button>
        </div>
      </Section>

      <Section2>
        <Title>나의 초대 코드</Title>
        <CodeBox>{myCode || "로딩 중..."}</CodeBox>
        <Button onClick={copyCode}>복사</Button>
      </Section2>
    </Container>
  );
}