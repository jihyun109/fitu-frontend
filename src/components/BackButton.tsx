import React from "react";
import styled from "styled-components";
import Back from "../assets/images/Arrow.svg";

interface BackButtonProps {
  onClick?: () => void;
  size?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

const Button = styled.button<{ position?: { top?: string; left?: string; right?: string; bottom?: string } }>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${({ position }) =>
    position &&
    `
    ${position.top ? `top: ${position.top};` : ""}
    ${position.left ? `left: ${position.left};` : ""}
    ${position.right ? `right: ${position.right};` : ""}
    ${position.bottom ? `bottom: ${position.bottom};` : ""}
  `}
`;

const Icon = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 24}px;
  height: ${({ size }) => size || 24}px;
`;

const BackButton: React.FC<BackButtonProps> = ({ onClick, size = 24, position }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <Button onClick={handleClick} position={position}>
      <Icon src={Back} alt="뒤로가기" size={size} />
    </Button>
  );
};

export default BackButton;
