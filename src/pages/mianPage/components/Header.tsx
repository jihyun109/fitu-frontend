import styled from "styled-components";
import MyPageIMG from "../../../assets/images/MyPageIMG.svg";
import { useNavigate } from "react-router-dom";
type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <HeaderItem style={{ justifyContent: "left" }}>{name}</HeaderItem>
      <HeaderItem
        onClick={()=>navigate('/')}
        style={{ fontWeight: "400", fontSize: "40px", color: "#17A1FA",width:'87px' }}
      >
        FITU
      </HeaderItem>
      <HeaderItem style={{ justifyContent: "end" }} onClick={()=>navigate('/mypage')}>
        <img src={MyPageIMG} />
      </HeaderItem>
    </HeaderWrapper>
  );
};
export default Header;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  height: 80px;
  padding: 0 30px;
  background-color: white;
  color: #007aff;
  font-weight: bold;
  font-size: 20px;
`;

const HeaderItem = styled.div`
  display: flex;
  width: 60px;
  align-items: center;
`;

