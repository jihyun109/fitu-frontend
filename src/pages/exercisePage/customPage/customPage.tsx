import React, { useState } from "react";
import styled from "styled-components";
import BackButton from "../../../components/BackButton";
import Header from "./components/Header";
import Categories from "./components/Categories";
import ExerciseList from "./components/ExerciseList";
const CustomPage = () => {
  const [category, setCategory] = useState("어깨");
  return (
    <Container>
      <BackButton />
      <Main>
        <Header />
        <Categories selected={category} onSelect={setCategory} />
        <ExerciseList />
      </Main>
    </Container>
  );
};

export default CustomPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  background: #fafafa;
`;

const Main = styled.main`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
