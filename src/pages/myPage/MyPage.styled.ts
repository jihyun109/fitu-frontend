import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: flex-start;
`;

// 상단
export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 402px;
  margin: 5rem auto 0 auto;
  width: 100%;
`;

// 신체 정보
export const BodyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 60%;
`;

export const SectionTitle = styled.p`
  font-size: 1.25rem;
  color: black;
  border-bottom: 2px solid black;
  padding-bottom: 8px;
  margin-bottom: 8px;
`;

export const ProfileWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin-left: 16px;
  margin-top: 2.5rem;
`;

export const Button = styled.button`
  font-weight: bold;
  border: 2px;
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  padding: 8px 0;
  cursor: pointer;
`;

// 그래프 모달
export const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 90%;
  max-width: 80rem;
  padding: 50px 20px 20px 20px;
  border-radius: 12px;
  position: relative;
`;
