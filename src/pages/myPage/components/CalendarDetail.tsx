import React, { useEffect, useState } from "react";
import BackButton from "../../../components/BackButton";
import { useLocation, useParams } from "react-router-dom";
import axiosInstance from "../../../apis/axiosInstance";
import { format } from "date-fns";
import {
  Container,
  Header,
  TopSummaryWrapper,
  InfoText,
  OhWoonWanImage,
  ExerciseCard,
  ExerciseImage,
  ExerciseInfo,
  SetRow
} from "./styles/CalendarDetail.styled";

type SetDetail = {
  setNumber: number;
  weight: number;
  reps: number;
};

type ExerciseDetail = {
  name: string;
  WorkoutImage: string | null;
  sets: SetDetail[];
};

type DailyDetailResponse = {
  date: string;
  totalMinutes: number;
  todayImage: string | null;
  details: ExerciseDetail[];
};

export default function CalendarDetail() {
  const { date } = useParams<{ date: string }>();
  const location = useLocation();
  
  const passedCategoryName = location.state?.record?.categoryName || "-";

  const [detailData, setDetailData] = useState<DailyDetailResponse | null>(null);

  useEffect(() => {
    const fetchDetailData = async () => {
      if (!date) return;
      try {
        const response = await axiosInstance.get(
          `/api/v2/workouts/calendar/details?date=${date}`
        );
        setDetailData(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchDetailData();
  }, [date]);

  const formattedDate = date ? format(new Date(date), "MM.dd") : "";

  return (
    <Container>
      <Header>
        <BackButton>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            {formattedDate} 운동
          </span>
          <div style={{ width: "24px" }} />
        </BackButton>
      </Header>

      {detailData ? (
        <>
          <TopSummaryWrapper>
            <div className="text-info">
              <InfoText>
                <span className="label">운동 시간</span>
                <span className="value">{detailData.totalMinutes}분</span>
              </InfoText>
              <InfoText>
                <span className="label">운동 부위</span>
                <span className="value">{passedCategoryName}</span>
              </InfoText>
            </div>

            <OhWoonWanImage $bgImage={detailData.todayImage}>
              {!detailData.todayImage && "사진 없음"}
            </OhWoonWanImage>
          </TopSummaryWrapper>

          <div style={{ padding: "0 24px" }}>
            {detailData.details.map((exercise, index) => (
              <ExerciseCard key={index}>
                <ExerciseImage $bgImage={exercise.WorkoutImage}>
                  {!exercise.WorkoutImage && "사진 없음"}
                </ExerciseImage>

                <ExerciseInfo>
                  <p className="exercise-name">{exercise.name}</p>
                  <div className="sets-wrapper">
                    {exercise.sets.map((set, sIndex) => (
                      <SetRow key={sIndex}>
                        {set.weight}kg {set.reps}회
                        <span className="set-num"> • {set.setNumber}세트</span>
                      </SetRow>
                    ))}
                  </div>
                </ExerciseInfo>
              </ExerciseCard>
            ))}
          </div>
        </>
      ) : (
        <p style={{ padding: "24px" }}>데이터를 불러오는 중입니다...</p>
      )}
    </Container>
  );
}