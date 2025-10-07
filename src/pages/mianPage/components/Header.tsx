import styled from "styled-components";
import MyPageIMG from "../../../assets/images/MyPageIMG.svg";
type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  return (
    <HeaderWrapper>
      <HeaderItem style={{ justifyContent: "left" }}>{name}</HeaderItem>
      <HeaderItem
        style={{ fontWeight: "400", fontSize: "40px", color: "#17A1FA" }}
      >
        FITU
      </HeaderItem>
      <HeaderItem style={{ justifyContent: "end" }}>
        <img src={MyPageIMG} />
      </HeaderItem>
    </HeaderWrapper>
  );
};
export default Header;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  margin: 10px 30px 0;
  color: #007aff;
  font-weight: bold;
  font-size: 20px;
`;

const HeaderItem = styled.div`
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: end;
`;
