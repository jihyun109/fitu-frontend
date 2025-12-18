import React, { useState } from "react";
import styled from "styled-components";
import ThreeDotIcon from "../../../assets/images/3dot.svg";
import SirenIcon from "../../../assets/images/Siren.svg";

interface MoreMenuProps {
  onReport: () => void;
  onDelete?: () => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ onReport, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuWrapper>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        <img src={ThreeDotIcon} alt="옵션" />
      </MenuButton>

      {isOpen && (
        <PopupMenu>
          <PopupItem onClick={() => { onReport(); setIsOpen(false); }}>
            <img src={SirenIcon} alt="신고" />
            신고
          </PopupItem>
          
          {onDelete && (
            <PopupItem onClick={() => { onDelete(); setIsOpen(false); }} $isDelete>
              삭제하기
            </PopupItem>
          )}
        </PopupMenu>
      )}
    </MenuWrapper>
  );
};

export default MoreMenu;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  img { width: 20px; height: 20px; }
`;

const PopupMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  margin-top: 4px;
`;

const PopupItem = styled.button<{ $isDelete?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: none;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  font-size: 13px;
  text-align: left;
  color: #333;

  &:hover { background-color: #f9f9f9; }
  &:last-child { border-bottom: none; }
  img { width: 14px; height: 14px; }
`;