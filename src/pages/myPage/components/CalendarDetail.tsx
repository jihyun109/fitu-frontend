import React from "react";
import { useNavigate } from "react-router-dom";
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

const Title = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
  font-size: 16px;
`;

export default function CalendarDetail() {
  const navigate = useNavigate();
    const { date } = useParams();
    const location = useLocation();
    const workout = location.state?.workout;

  return (
    <Container>
      <Header>
        <BackButton
          onClick={() => navigate(-1)}
          position={{ top: "18px", left: "16px" }}
          size={20}
        />
        <Title>{date} 운동</Title>
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