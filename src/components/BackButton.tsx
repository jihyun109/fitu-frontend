import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Back from "../assets/images/Arrow.svg";

interface BackButtonProps {
  onClick?: () => void;
  size?: number;
  position?: { top?: string; left?: string; right?: string; bottom?: string };
  children?: React.ReactNode;
}

const Button = styled.button<{
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
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

const Label = styled.span`
  position: absolute;
  top: 13px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
`;

const BackButton: React.FC<BackButtonProps> = ({
  onClick,
  size = 15,
  position = { top: "20px", left: "20px" },
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  return (
    <>
      <Button onClick={handleClick} position={position}>
        <Icon src={Back} alt="뒤로가기" size={size} />
      </Button>
      {children && <Label>{children}</Label>}
    </>
  );
};

export default BackButton;