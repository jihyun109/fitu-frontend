import styled from "styled-components";

const GuideNotice = () => {
  return (
    <Container>
      <Title>운동 3대 인증 안내</Title>

      <List>
        <Item>
          <Strong>1. 영상 촬영 필수</Strong>
          <Sub>- 인증 영상은 관리자만 확인하며, 인증 확인 후 즉시 삭제됩니다.</Sub>
          <Sub>- 영상 속에 사용하는 무게(kg)가 잘 보이도록 촬영해주세요.</Sub>
        </Item>

        <Item>
          <Strong>2. 기구만 사용 가능</Strong>
          <Sub>- 반드시 학교 내에 있는 원판 및 기구로만 인증해야 합니다.</Sub>
        </Item>

        <Item>
          <Strong>3. 자세 준수</Strong>
          <Sub>- 정확한 자세로 수행해야 하며, 자세 불량 시 인증이 인정되지 않습니다.</Sub>
        </Item>
      </List>

      <Footer>
        정확한 기록과 안전을 위해 규칙을 꼭 지켜주세요.<br />
        여러분의 도전을 응원합니다!
      </Footer>
    </Container>
  );
};

export default GuideNotice;

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  font-size: 14px;
  line-height: 1.6;
  overflow: auto;
`;

const Title = styled.h3`
  color: #ff4d4f;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin-bottom: 12px;
`;

const Strong = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Sub = styled.div`
  color: #555;
  font-size: 13px;
`;

const Footer = styled.div`
  margin-top: 12px;
  font-size: 13px;
  color: #666;
`;

