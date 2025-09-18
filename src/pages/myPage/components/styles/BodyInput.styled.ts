import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #7a7a7a;
  padding-bottom: 5px;
  padding-left: 3px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  flex: 1;
  width: 45%;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  background-color: white;
  color: black;
  border: none;
`;

export const Unit = styled.span`
  margin-left: 4px;
  font-weight: bold;
  font-size: 16px;
  color: black;
  white-space: nowrap;
`;
