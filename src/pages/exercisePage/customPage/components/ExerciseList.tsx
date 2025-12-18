import React,{useEffect, useState} from "react";
import styled from "styled-components";

type ExItem = { id: string; name: string; thumbnail?: string };
type ExerciseItem = {workoutId: string; workoutName: string, imageUrl?: string, description?: string}; 

const MOCK: ExItem[] = [
  { id: "m1", name: "운동명 A" },
  { id: "m2", name: "운동명 B" },
  { id: "m3", name: "운동명 C" },
  { id: "m4", name: "운동명 D" },
];

const ExerciseList = ({ exercises, onAdd }: { exercises: ExerciseItem[]; onAdd: (it: ExItem) => void }) => {
  return (
  <ListContainer>
      {exercises.map((item) => (
        <ExerciseItem key={item.workoutId} onClick={() => onAdd({ id: item.workoutId, name: item.workoutName, thumbnail: item.imageUrl })}>
          <ImageBox>{item.imageUrl ? <img src={item.imageUrl} alt={item.workoutName} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "그림"}</ImageBox>
          <Info>
            <Title>{item.workoutName}</Title>
            <Desc>{item.description}</Desc>
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
