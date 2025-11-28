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
     
      <p style={{ marginTop: "50px" }}>운동할 부위를</p>
      <p>골라주세요!</p>
       <Layout>
        <SelectBox selected={exerciseArea} onChange={setExerciseArea} />
        </Layout>
        <ExerciseBTN />
    </Container>
  );
};

export default ExercisePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  height: 100vh;
  p {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
  }
`;

const Layout = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: column;
   align-items: center;
  width: 100%;
  box-sizing: border-box;
`;
