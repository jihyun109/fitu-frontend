import React from "react";
import styled from "styled-components";

export type AdminTabType =
  | "addEquipment"
  | "reportPost"
  | "exerciseCertification"
  | "membershipReport";

interface AdminTabProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
}

interface Tab {
  label: string;
  value: AdminTabType;
}

const AdminTab: React.FC<AdminTabProps> = ({ activeTab, setActiveTab }) => {
  const adminTabList: Tab[] = [
    { label: "운동기구 추가", value: "addEquipment" },
    { label: "게시물 신고", value: "reportPost" },
    { label: "운동 인증", value: "exerciseCertification" },
    { label: "회원 신고", value: "membershipReport" },
  ];

  return (
    <TabContainer>
      <TabButtonContainer>
        {adminTabList.map((tab) => (
          <TabButton
            key={tab.value}
            active={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabButtonContainer>
    </TabContainer>
  );
};

export default AdminTab;

const TabContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const TabButtonContainer = styled.div`
  display: flex;
  margin-top: 12px;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 30px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  background-color: ${({ active }) => (active ? "#303030" : "#E9E9E9")};
  color: ${({ active }) => (active ? "#fff" : "#6E6E6E")};
  &:first-child {
    border-top-left-radius: 12px;
  }
  &:last-child {
    border-top-right-radius: 12px;
  }
`;
