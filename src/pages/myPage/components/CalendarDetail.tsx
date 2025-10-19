import React from "react";
import BackButton from "../../../components/BackButton";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";

const Container = styled.div`
  padding: 24px;
  background-color: #f9fafb;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #CED4DB;
`;

export default function CalendarDetail() {
    const { date } = useParams();
    const location = useLocation();
    const workout = location.state?.workout;

  return (
    <Container>
      <Header>
        <BackButton>{date} 운동</BackButton>
      </Header>
      <div style={{ padding: "20px" }}>
        <p>운동명: {workout.name}</p>
        <p>세트: {workout.sets}</p>
        <p>무게: {workout.weight}kg</p>
        <p>횟수: {workout.repsPerSet}회</p>
      </div>
    </Container>
  );
}