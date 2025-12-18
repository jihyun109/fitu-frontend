import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  padding: 6px 12px;
  background-color: #FF4D4F;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff7875;
  }
`;

const CancelButton = styled.button`
  padding: 6px 12px;
  background-color: #F0F0F0;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #d9d9d9;
  }
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const navigate = useNavigate();

  const handleDeactivate = async () => {
    const token = sessionStorage.getItem("Authorization");
    
    if (!token) {
        alert("로그인 정보가 없습니다.");
        navigate("/");
        return;
    }

    try {
      await axiosInstance.delete('/api/v2/users/deactivate', {
        headers: { Authorization: token }
      });

      alert("회원 탈퇴가 완료되었습니다.");
      
      sessionStorage.clear();
      
      if (onConfirm) onConfirm();

      navigate('/');

    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴 처리에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Message>
          정말로 회원탈퇴 하시겠습니까?<br/>
          <span style={{ fontSize: '12px', color: '#888' }}>
            탈퇴 시 모든 정보가 삭제됩니다.
          </span>
        </Message>
        <ButtonGroup>
          <ConfirmButton onClick={handleDeactivate}>확인</ConfirmButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};