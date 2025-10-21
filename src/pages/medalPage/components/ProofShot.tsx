import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cam from "../../../assets/images/camera-video.svg"
const ProofShot: React.FC = () => {
  const navigate = useNavigate();
  return (
    <FooterWrapper>
        <FooterItem>
        <img src={Cam}/>인증하기
        </FooterItem>
    </FooterWrapper>
  );
};
export default ProofShot;
const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 76px;
  padding: 0 30px;
  background-color: white;
  
`;

const FooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B4B4B;
  font-weight: bold;
  font-size: 15px;
  img {
    width: 28px;
    height: 28px;
    padding: 7px;
  }
`;
