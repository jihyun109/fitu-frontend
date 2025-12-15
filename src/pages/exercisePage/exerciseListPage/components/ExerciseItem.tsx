import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../../../../components/BackButton";

type MainWorkout = {
  workoutName: string;
  workoutImgUrl: string;
  workoutDescription?: string;
  workoutGifUrl?: string;
};
type SetItem = {
  weight: number | "";
  reps: number | "";
};

type SetData = {
  setIndex: number;
  weight: number;
  reps: number;
};

type SavedWorkout = {
  workoutName: string;
  orderIndex: number;
  sets: SetData[];
};

type ExerciseItemProps = {
  mainWorkout: MainWorkout;
  orderIndex: number;
  onSave: (workout: SavedWorkout) => void;
};

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  mainWorkout,
  orderIndex,
  onSave,
}) => {
  const [open, setOpen] = useState(false);
  const [sets, setSets] = useState<SetItem[]>([{ weight: "", reps: "" }]);

  const increaseSet = () => {
    setSets([...sets, { weight: "", reps: "" }]);
  };

  const decreaseSet = () => {
    if (sets.length <= 1) return;
    setSets(sets.slice(0, -1));
  };

  const validSets = sets.filter((set) => set.weight !== "" && set.reps !== "");

  const updateSet = (idx: number, key: keyof SetItem, value: number) => {
    const copy = [...sets];
    copy[idx][key] = value;
    setSets(copy);
  };
 const handleSave = () => {
    if (validSets.length === 0) return;

    const formattedSets: SetData[] = validSets.map((set, idx) => ({
      setIndex: idx + 1,
      weight: Number(set.weight),
      reps: Number(set.reps),
    }));

    onSave({
      workoutName: mainWorkout.workoutName,
      orderIndex,
      sets: formattedSets,
    });

    setOpen(false);
  };
  return (
    <>
      <Card onClick={() => setOpen(true)}>
        <ImageBox>
          <img src={mainWorkout.workoutImgUrl} />
        </ImageBox>

        <ContentBox>
          <Name>{mainWorkout.workoutName}</Name>
          <Description>{mainWorkout.workoutDescription}</Description>
        </ContentBox>

        {validSets.length > 0 && (
          <MetaBox>
            <Meta>
              {validSets[0].weight}kg {validSets[0].reps}회 {validSets.length}
              세트
            </Meta>
          </MetaBox>
        )}
      </Card>

      {open && (
        <FullPage>
          <Header>
            <BackButton onClick={() => setOpen(false)} />
          </Header>

          <Body>
              <ContentBox>
          <Name style={{fontSize:'20px'}}>{mainWorkout.workoutName}</Name>
        </ContentBox>
             <ImageBox style={{width:'100%',height:'auto',backgroundColor:'transparent' }}>
          <img style={{width:'200px', height:'200px'}} src={mainWorkout.workoutGifUrl} />
        </ImageBox>
            <SetCounter>
              <CounterBtn onClick={decreaseSet}>-</CounterBtn>
              <Count>{sets.length}</Count>
              <CounterBtn onClick={increaseSet}>+</CounterBtn>
            </SetCounter>
            {sets.map((set, idx) => (
              <SetCard key={idx}>
                <SetTitle>{idx + 1}세트</SetTitle>

                <SetMeta>
                  <SmallInput
                    type="string"
                    value={set.weight}
                    onChange={(e) => updateSet(idx, "weight", +e.target.value)}
                  />
                  <Unit>kg</Unit>

                  <SmallInput
                    type="string"
                    value={set.reps}
                    onChange={(e) => updateSet(idx, "reps", +e.target.value)}
                  />
                  <Unit>회</Unit>
                </SetMeta>
              </SetCard>
            ))}
          </Body>

          <Footer>
            <SaveButton onClick={handleSave}>저장하고 뒤로가기</SaveButton>
          </Footer>
        </FullPage>
      )}
    </>
  );
};

export default ExerciseItem;

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  border: 1px solid white;
  background: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    border-color: #0a84ff;
  }
`;

const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  background: #f5f5f5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  font-size: 14px;
  color: #999;
`;

const ContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #222;
`;

const Description = styled.div`
  font-size: 13px;
  color: #888;
`;

const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Meta = styled.div`
  font-size: 12px;
  color: #666;
`;

const FullPage = styled.div`
  position: fixed;
  inset: 0;
  background: #ffffff;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const Body = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

const Preview = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 16px;
  background: #e6e6e6;
  margin-bottom: 24px;
`;

const SetCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 24px;
`;

const CounterBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f1f1f1;
  border: none;
  font-size: 20px;
  font-weight: 700;
`;

const Count = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const SetCard = styled.div`
  background: #f5f7fa;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
`;

const SetTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const SetMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SmallInput = styled.input`
  width: 64px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
`;

const Unit = styled.div`
  font-size: 13px;
  color: #555;
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: #0a84ff;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  border: none;
`;
