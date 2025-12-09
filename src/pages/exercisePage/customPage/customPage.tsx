import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BackButton from "../../../components/BackButton";
import Header from "./components/Header";
import Categories from "./components/Categories";
import ExerciseList from "./components/ExerciseList";
import axiosInstance from "../../../apis/axiosInstance";

type ThumbItem = { id: string; name: string; imgUrl?: string };
type ExerciseItem = {
  workoutId: string;
  workoutName: string;
  imageUrl?: string;
  description?: string;
};
const CustomPage = () => {
  const [category, setCategory] = useState("shoulder");
  const [thumbs, setThumbs] = useState<ThumbItem[]>([]);
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axiosInstance.get("/api/v2/workouts/custom", {
          params: { category },
        });

        console.log("API 결과:", res.data.data);
        setExercises(res.data.data);
      } catch (error) {
        console.error("운동 데이터 불러오기 실패:", error);
      }
    };

    fetchExercises();
  }, [category]);

  const addThumb = (item: ThumbItem) => {
    setThumbs((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev;
      const next = [...prev, item].slice(0, 10);
      return next;
    });
  };

  const removeThumb = (id: string) => {
    setThumbs((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <Container>
      <BackButton />
      <HeaderWrapper>
        <Header thumbs={thumbs} onRemove={removeThumb} />
      </HeaderWrapper>
      <Categories selected={category} onSelect={setCategory} />
      <Main>
        <ExerciseList onAdd={addThumb} exercises={exercises} />
      </Main>
      <StyledButton disabled={thumbs.length === 0}>운동하기</StyledButton>
    </Container>
  );
};

export default CustomPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  background: #fafafa;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
`;
const Main = styled.main`
  width: 100%;
  max-width: 420px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledButton = styled.button`
  width: 100%;
  max-width: 420px;
  height: 56px;
  border: none;
  background-color: #007aff;
  font-size: 18px;
  color: white;
  border-radius: 12px;

  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
