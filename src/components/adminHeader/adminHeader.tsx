import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const AdminHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { key: "request", label: "요청 문의", path: "/admin/request" },
    { key: "post", label: "게시물 관리", path: "/admin/post" },
    { key: "member", label: "회원 관리", path: "/admin/member" },
  ];

  return (
    <HeaderContainer>
      <Nav>
        {tabs.map((tab) => (
          <NavButton
            key={tab.key}
            active={location.pathname.includes(tab.path)}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </NavButton>
        ))}
      </Nav>
    </HeaderContainer>
  );
};

export default AdminHeader;

const HeaderContainer = styled.header`
  display: flex;
  padding: 33px 24px;
  margin: 21px 367px;
  align-items: center;

  width: 100%;
  max-width: 1200px;
  min-width: 600px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  display: flex;
  gap: 96px;
`;

const NavButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 22px;
  color: #212528;

  padding-bottom: 27px;
  border-bottom: ${({ active }) => (active ? "2px solid #212528" : "none")};
`;
