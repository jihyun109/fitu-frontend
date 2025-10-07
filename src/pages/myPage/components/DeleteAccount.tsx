import React from "react";
import styled from "styled-components";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
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
`;

const CancelButton = styled.button`
  padding: 6px 12px;
  background-color: #F0F0F0;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Message = styled.p`
  font-size: 16px;
`;

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Message>정말로 회원탈퇴 하시겠습니까?</Message>
        <ButtonGroup>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onClose}>취소</CancelButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};
