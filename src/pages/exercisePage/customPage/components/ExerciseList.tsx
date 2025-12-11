import React from "react";
import styled from "styled-components";

const EXERCISES = [
  { name: "운동명", desc: "운동설명명" },
  { name: "운동명", desc: "운동설명명" },
  { name: "운동명", desc: "운동설명명" },
  { name: "운동명", desc: "운동설명명" },
  { name: "운동명", desc: "운동설명명" },
];

const ExerciseList = () => {
  return (
    <ListContainer>
      {EXERCISES.map((item, i) => (
        <ExerciseItem key={i}>
          <ImageBox>그림</ImageBox>
          <Info>
            <Title>{item.name}</Title>
            <Desc>{item.desc}</Desc>
          </Info>
        </ExerciseItem>
      ))}
    </ListContainer>
  );
};

export default ExerciseList;


const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 6px;
`;

const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ImageBox = styled.div`
  width: 56px;
  height: 56px;
  background: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: #444;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #222;
`;

const Desc = styled.div`
  font-size: 13px;
  color: #777;
`;
