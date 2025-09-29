import React, { useState } from "react";
import styled from "styled-components";
import { FormData } from "../../../../types/type";
import axiosInstance from "../../../../apis/axiosInstance";

interface Step1FormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onNext: () => void;
}

const Step1Form: React.FC<Step1FormProps> = ({ formData, setFormData, onNext }) => {
  const [showVerify, setShowVerify] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");



  const handleVerify= async()=>{
    const email = formData.email;
      try{
          const res = await axiosInstance.post('/auth/email/send',{email});
          console.log(res);
          if(res.status === 200){
          setShowVerify(true);
          alert('전송완료! 5분이내 입력해주세요.')
            }else{
              alert('유효하지 않은 이메일입니다.')
            }
      }catch(error){
        console.log(error);
      }
  }
    const handleCheckCode = async() => {
   try{
      const res = await axiosInstance.post('/auth/email/verify', {
        email : formData.email,
        code: verifyCode
      })
      if(res.status ==200){
        setIsVerified(true)
      }else{
        alert('유효하지 않는 인증번호입니다.')
      }
   }catch(error){
    console.log(error);
   }
      
  };
    const isButtonEnabled = formData.name.trim() !== "" && isVerified;

  return (
    <Form>
      <Title>회원 정보</Title>

      <Label>성명</Label>
      <Input
        type="text"
        placeholder="이름을 입력하세요"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Label style={{ marginTop: "85px" }}>학교 이메일</Label>
      <InputRow>
        <Input
          type="email"
          placeholder="이메일 입력"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <VerifyButton onClick={handleVerify}>인증 요청</VerifyButton>
      </InputRow>
            {!showVerify && (
        <InputRow>
          <Input
            type="text"
            placeholder="인증번호 입력"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
          <VerifyButton style={{backgroundColor:'white'}} type="button" onClick={handleCheckCode}>
            확인
          </VerifyButton>
        </InputRow>
      )}
      <NextButton onClick={onNext} disabled={!isButtonEnabled}>
        다음으로
      </NextButton>
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

const NextButton = styled.button<{ disabled: boolean }>`
  padding: 14px;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: calc(100% - 40px);
  max-width: 400px;
  transition: background 0.3s;
`;