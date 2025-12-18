import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-x: hidden;
`;

export const TopSection = styled.div`
  display: flex;
  width: 80%;
`;

export const BodyInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding-left: 20px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  margin-bottom: 12px;
`;

export const SectionTitle = styled.p`
  color: black;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 20px;
`;

export const ProfileWrapper = styled.div`
  width: 35%;
  height: 200px;
  margin-left: 20px;
  margin-top: 30px;
`;

export const Button = styled.button`
  font-weight: bold;
  font-size: 18px;
  border: 2px;
  border-radius: 8px;
  width: 100%;
  margin-top: 16px;
  padding-bottom: 10px;
`;

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

