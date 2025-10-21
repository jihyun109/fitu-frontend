import React from "react";
import styled from "styled-components";
import BackButton from "../../../components/BackButton";
import Footer from "../../mainPage/components/Footer";
import ProofShot from "./ProofShot";
type RankingItem = {
  rank: number | string;
  name: string;
  value?: number | string;
  unit?: string;
  isMe?: boolean;
  exercises?: string[];
  imgURL?: string;
};

interface Props {
  title: string | null;
  rankingData: RankingItem[];
  showInfoText?: boolean;
  updateTime?: string;
}

const MedalRanking: React.FC<Props> = ({
  title,
  rankingData,
  showInfoText,
  updateTime,
}) => {
  const top3 = rankingData.slice(0, 3);
  const others = rankingData.slice(3);
  const formatValue = (item?: RankingItem) => {
    if (!item || item.value === undefined || item.value === null)
      return "기록 없음";
    const unit = item.unit ?? (typeof item.value === "number" ? "회" : "");
    if (title === "규칙적운동") return `${item.value}${unit}`;
    return `${unit} ${item.value}`;
  };
  console.log(rankingData);
  return (
    <Wrapper>
      <Header>
        <BackButton />
        <Title>{title} 🏅</Title>
      </Header>

      {updateTime && <UpdateText>업데이트 : {updateTime}</UpdateText>}

      <Body>
        {top3.length === 3 && (
          <Top3Area>
            <FirstPlace>
              <MedalIcon rank={1}>🥇</MedalIcon>
              <ProfileBig imgURL={top3[0].imgURL} />
              <UserNameBig>{top3[0].name}</UserNameBig>
              <CountBig>{formatValue(top3[0])}</CountBig>
            </FirstPlace>

            <SecondRow>
              <SecondPlace>
                <MedalIcon rank={2}>🥈</MedalIcon>
                <ProfileBig imgURL={top3[1].imgURL} />
                <UserNameSmall>{top3[1].name}</UserNameSmall>
                <CountBig>{formatValue(top3[1])}</CountBig>
              </SecondPlace>

              <ThirdPlace>
                <MedalIcon rank={3}>🥉</MedalIcon>
                <ProfileBig imgURL={top3[2].imgURL} />
                <UserNameSmall>{top3[2].name}</UserNameSmall>
                <CountBig>{formatValue(top3[2])}</CountBig>
              </ThirdPlace>
            </SecondRow>
          </Top3Area>
        )}

        <InfoText>
          동일 {!showInfoText ? "무게" : "횟수"}의 경우, 총 운동시간을 기준으로
          순위를 산정합니다.
        </InfoText>
        <ScrollArea>
          <RankList>
            {others
              .filter((user) => !user.isMe)
              .map((user, index) => (
                <ListRow key={index}>
                  <RankNumber>{user.rank}</RankNumber>
                  <UserInfo>
                    <Profile imgURL={user.imgURL} />
                    <NameText>{user.name}</NameText>
                  </UserInfo>
                  <CountText>{formatValue(user)}</CountText>
                </ListRow>
              ))}
          </RankList>
        </ScrollArea>
        <MyRank>
          {(() => {
            const myRankData = rankingData.find((u) => u.isMe === true);
            console.log(myRankData);
            return myRankData ? (
              <ListRow>
                <RankNumber>{myRankData.rank}</RankNumber>
                <UserInfo>
                  <Profile imgURL={myRankData.imgURL} />
                  <NameText>{myRankData.name}</NameText>
                </UserInfo>
                {myRankData.exercises && <Exercises>{myRankData.exercises.map((user,i)=>(
                  <div>{user}</div>
                ))}</Exercises>}
                <CountText>{formatValue(myRankData)}</CountText>
              </ListRow>
            ) : null;
          })()}
        </MyRank>
      </Body>
      {!showInfoText ? <ProofShot /> : <Footer />}
    </Wrapper>
  );
};

export default MedalRanking;

const MyRank = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid #f2f2f2;
  font-weight: 700;
  color: #007aff;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: #fff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0;
  font-weight: 600;
  font-size: 18px;
  position: relative;
  border-bottom: 1px solid #e7e7e7;
`;

const Title = styled.div`
  text-align: center;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px 0px;
  border-bottom: 1px solid #e7e7e7;
  min-height: 0;
`;

const UpdateText = styled.div`
  font-size: 13px;
  color: gray;
  align-self: flex-end;
  margin: 4px;
`;

const Top3Area = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;

const FirstPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
`;

const MedalIcon = styled.div<{ rank?: number }>`
  font-size: 28px;
  margin-bottom: 6px;
`;

const ProfileBig = styled.div<{ imgURL?: string }>`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-image: ${({ imgURL }) => (imgURL ? `url(${imgURL})` : "none")};
  background-size: cover;
  background-position: center;
  margin-bottom: 6px;
`;

const UserNameBig = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const CountBig = styled.div`
  color: #007aff;
  font-weight: 700;
`;

const SecondRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const SecondPlace = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6px;
`;

const ThirdPlace = styled(SecondPlace)``;

const UserNameSmall = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 2px;
`;

const InfoText = styled.div<{ hidden?: boolean }>`
  font-size: 9px;
  color: gray;
  margin: 9px 0 6px;
  width: 100%;
  text-align: right;
`;

const RankList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  border-top: 1px solid #f2f2f2;
  padding: 12px 0;
`;

const Exercises = styled.div`
  display: flex;
  flex-direction: column;
  div{
    font-size: 12px;
    margin-right: 5px;
  }
`;

const RankNumber = styled.div`
  width: 28px;
  text-align: left;
  font-weight: 700;
`;

const ScrollArea = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  min-height: 0;
  border-top: 1px solid #e7e7e7;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`;

const Profile = styled.div<{ imgURL?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #f0f0f0;
  background-image: ${({ imgURL }) => (imgURL ? `url(${imgURL})` : "none")};
  background-size: cover;
  background-position: center;
`;

const NameText = styled.div`
  font-size: 15px;
`;

const CountText = styled.div`
  color: #007aff;
  font-weight: 700;
`;
