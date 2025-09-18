import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  overflow: hidden;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0 1rem;
`;

export const CancelButton = styled.button`
  background-color: #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #9ca3af;
  }
`;

export const ConfirmButton = styled.button`
  background-color: #06b6d4;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  color: white;
  transition: background-color 0.2s;
  &:hover {
    background-color: #0891b2;
  }
`;
