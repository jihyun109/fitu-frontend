import React from "react";
import styled from "styled-components";
import Arrow from "../../../../assets/images/Arrow.svg";

interface HeaderProps {
  step: number;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ step, onBack }) => {
  return (
    <Wrapper>
      <BackButton onClick={onBack}>
        <img src={Arrow} alt="뒤로가기" />
      </BackButton>
      <ProgressBar>
        <Progress step={step} />
      </ProgressBar>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
     align-self: flex-start;
  img {
    width: 20px;
    height: 20px;
  }
  padding: 0;
`;

const ProgressBar = styled.div`
 width: 100%;       
  height: 2px;
  background: #e5e5e5;
  margin-top: 16px;
  position: relative;
`;

const Progress = styled.div<{ step: number }>`
  height: 2px;
  width: ${(props) => (props.step / 2) * 100}%;
  background: #007bff;
  transition: width 0.3s ease;
`;
