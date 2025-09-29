import styled, { createGlobalStyle } from "styled-components";

export const CalendarGlobalStyle = createGlobalStyle`
  // 좌우 화살표 색
  .rdp-chevron {
    fill: #909090;
  }
  .rdp-root {
    --rdp-accent-color: #007AFF;
  }
  .rdp-day {
    width: 44px !important;
    height: 44px !important;
    line-height: 44px !important;
    font-size: 16px;
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
    font-size: 18px;
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
`;

export const WorkoutListWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  text-align: center;

  p {
    padding-left: 10px;
    font-weight: bold;
    font-size: 20px;
    text-align: left;
  }

  ul {
    text-align: left;
    padding-left: 10px;
    
    li {
      font-size: 16px;
      color: black;
      list-style-type: none;
    }
  }
`;
