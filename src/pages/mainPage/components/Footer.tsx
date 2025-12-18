import styled from "styled-components";
import Request from "../../../assets/images/requestIcon.png";
import Chat from "../../../assets/images/chatIcon.png";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
      <FooterItem
        onClick={() => navigate("/request")}
        style={{ justifyContent: "left" }}
      >
        <img src={Request} />
        <div>인증하기</div>
      </FooterItem>
      <FooterItem
        onClick={() => navigate("/exercise")}
        style={{ fontWeight: "400", fontSize: "15px", color: "#4B4B4B" }}
      >
        운동하기
      </FooterItem>
      <FooterItem
        onClick={() => navigate("/chatlist")}
        style={{ justifyContent: "end" }}
      >
        <img src={Chat} style={{ width: "31px" }} />
        <div>채팅</div>
      </FooterItem>
    </FooterWrapper>
  );
};
export default Footer;
const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  height: 76px;
  padding: 0 30px;
  background-color: white;
`;

const FooterItem = styled.div`
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 28px;
    height: 28px;
  }
`;
