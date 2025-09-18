import styled, { createGlobalStyle } from "styled-components";

export const CalendarGlobalStyle = createGlobalStyle`
  // 좌우 화살표 색
  .rdp-chevron {
    fill: black;
  }
  
  .rdp-day {
    width: 48px !important;
    height: 48px !important;
    line-height: 48px !important;
    font-size: 1.1rem;
    text-align: center;
    border-radius: 50%;
  }

  // 기록 있는 날짜
  .recorded-day {
    background-color: #E6F4FD !important;
    color: #007AFF !important;
  }

  // 기록 없는 날짜
  .norecord-day {
    background-color: white !important;
    color: black !important;
  }

  .rdp-caption_label,
  .rdp-head_cell {
    font-size: 1.2rem;
  }
`;

export const CalendarWrapper = styled.div`
  min-height: 50%;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DayPickerWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;
`;

export const WorkoutListWrapper = styled.div`
  margin-top: 1.5rem;
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  text-align: center;

  p {
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  ul {
    text-align: left;

    li {
      margin-bottom: 0.25rem;
      font-size: 0.875rem;
      color: #4a4a4a;
    }
  }
`;
