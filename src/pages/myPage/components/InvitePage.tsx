import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../../../components/BackButton";

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
  background-color: #F8F8F8;
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
  background-color: #007AFF;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #06b6d4;
  }
`;

// const Header = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   position: relative;
//   height: 60px;
//   background-color: white;
// `;

// const HeaderTitle = styled.div`
//   position: absolute;
//   left: 50%;
//   transform: translateX(-50%);
//   font-weight: 600;
//   font-size: 16px;
// `;

export default function InvitePage() {
  const [myCode] = useState("ABC1DEF"); // 서버에서 가져오도록 구현 필요
  const [friendCode, setFriendCode] = useState("");

  const copyCode = () => {
    navigator.clipboard.writeText(myCode);
    alert("초대 코드가 복사되었습니다!");
  };

  const addFriendCode = () => {
    if (!friendCode) return alert("코드를 입력하세요.");
    // 서버로 POST 요청
    alert(`친구 초대 코드 ${friendCode} 추가 요청`);
    setFriendCode("");
  };

  return (
    <Container>
      {/* <Header> */}
        <BackButton>친구 초대 코드</BackButton>
        {/* <HeaderTitle>친구 초대 코드</HeaderTitle> */}
      {/* </Header> */}

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
        <CodeBox>{myCode}</CodeBox>
        <Button onClick={copyCode}>복사</Button>
      </Section2>
    </Container>
  );
}
