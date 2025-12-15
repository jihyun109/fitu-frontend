import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import ExerciseItem from "./components/ExerciseItem";
import Timer from "./components/Timer";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
type MainWorkout = {
  workoutName: string;
  workoutImgUrl: string;
  workoutDescription?: string;
  workoutGifUrl?: string;
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
const ExerciseList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [exercises, setExercises] = useState<MainWorkout[]>([]);
  const [workoutList, setWorkoutList] = useState<SavedWorkout[]>([]);
  const [totalMinutes, setWorkoutMinutes] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  console.log(totalMinutes);
  console.log(workoutList);
  console.log(imageFile);
  useEffect(() => {
    if (!location.state) {
      navigate("/exercise");
      return;
    }
    const { selectedWorkouts } = location.state as {
      selectedWorkouts: MainWorkout[];
    };
    setExercises(selectedWorkouts);
  }, [location.state, navigate]);

  const handleSaveWorkout = (workout: SavedWorkout) => {
    setWorkoutList((prev) => {
      const filtered = prev.filter(
        (w) => w.workoutName !== workout.workoutName
      );
      return [...filtered, workout];
    });
  };

  const handleSubmit = async () => {
    const payload = {
      exercises: workoutList,
      totalMinutes,
    };
    const formData = new FormData();
    formData.append(
      "requestDTO",
      new Blob([JSON.stringify(payload)], {
        type: "application/json",
      })
    );
    if (imageFile) {
      formData.append("image", imageFile);
    }
    await axiosInstance.post("/api/v2/workouts/sessions/end", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(payload);
  };

  return (
    <Container>
      <BackButton />
      <Timer onMinuteChange={setWorkoutMinutes} />
      <ListWrapper>
        {exercises.map((exercise, idx) => (
          <ExerciseItem
            key={idx}
            mainWorkout={exercise}
            orderIndex={idx + 1}
            onSave={handleSaveWorkout}
          />
        ))}
      </ListWrapper>
      <ImageUploadWrapper>
        <ImageLabel
          htmlFor={!imageFile ? "workout-image" : undefined}
          onClick={(e) => {
            if (imageFile) {
              e.preventDefault();
              setImageFile(null);
            }
          }}
        >
          {imageFile ? "사진 삭제" : "사진 기록"}
        </ImageLabel>
        <input
          id="workout-image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              e.target.value = "";
            }
          }}
        />
        {imageFile && <FileName>{imageFile.name}</FileName>}
      </ImageUploadWrapper>
      <CustomBTN onClick={handleSubmit}>운동완료</CustomBTN>
    </Container>
  );
};

export default ExerciseList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding-left: 16px;
  padding-right: 16px;
`;

const ListWrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
`;

const CustomBTN = styled.button`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #007aff;
  color: white;
  height: 56px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  margin-bottom: 20px;
`;

const ImageUploadWrapper = styled.div`
  width: 100%;
  margin: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    display: none;
  }
`;

const ImageLabel = styled.label`
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  border: 1px solid #007AFF;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
`;

const FileName = styled.span`
  margin-top: 6px;
  font-size: 12px;
  color: #666;
`;
