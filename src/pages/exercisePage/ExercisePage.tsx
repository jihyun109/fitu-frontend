import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../../components/BackButton";
import SelectBox from "./components/SelectBox";
import ExerciseBTN from "./components/ExerciseBTN";
const ExercisePage = () => {
  const [exerciseArea, setExerciseArea] = useState<string[]>([]);
  console.log(exerciseArea);
  return (
    <Container>
      <BackButton />
      <p style={{marginTop:'50px'}}>운동할 부위를</p>
      <p>골라주세요!</p>
      <SelectBox selected={exerciseArea} onChange={setExerciseArea} />
      <ExerciseBTN/>
    </Container>
  );
};

export default ExercisePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; 

  p {
    margin: 0;
    font-size: 28px; 
    font-weight: 700;
  }
`;
