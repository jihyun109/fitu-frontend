import React from "react";
import styled from "styled-components";

interface Step1FormProps {
  onNext: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ onNext }) => {
  return (
    <Form>
      <Title>회원 정보</Title>

      <Label>성명</Label>
      <Input type="text" placeholder="이름을 입력하세요" />

      <Label style={{marginTop:'85px'}}>학교 이메일</Label>
      <InputRow>
        <Input type="email" placeholder="이메일 입력" />
        <VerifyButton>인증 요청</VerifyButton>
      </InputRow>

      <NextButton onClick={onNext}>다음으로</NextButton>
    </Form>
  );
};

export default Step1Form;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 17px;
  margin-bottom: 6px;
  margin-top: 30px;
`;

const Input = styled.input`
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;

const VerifyButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  background: #f1f1f1;
  border: none;
  cursor: pointer;
`;

const NextButton = styled.button`
  padding: 14px;
  border-radius: 8px;
  background: #007bff;
  color: white;
  border: none;
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  width: calc(100% - 40px);
  max-width: 400px;
`;
