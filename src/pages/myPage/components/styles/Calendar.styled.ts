import styled, { createGlobalStyle } from "styled-components";

export const CalendarGlobalStyle = createGlobalStyle`
  .rdp-chevron {
    fill: #909090;
  }
  .rdp-root {
    --rdp-accent-color: #007AFF;
  }
  .rdp-day {
    width: 40px !important;
    height: 40px !important;
    line-height: 40px !important;
    font-size: 14px;
    text-align: center;
    border-radius: 50%;
  }

  .recorded-day {
    background-color: #E6F4FD !important;
    color: #007AFF !important;
    font-weight: bold;
  }

  .norecord-day {
    background-color: transparent;
    color: black;
  }

  .rdp-caption_label,
  .rdp-head_cell {
    font-size: 16px;
    font-weight: 600;
  }

  .rdp {
    margin: 0;
  }
`;

export const CalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
`;

export const DayPickerWrapper = styled.div`
  width: 100%;
  max-width: 360px;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`;

export const Seperator = styled.div`
  width: 100%;
  height: 10px;
  background-color: #F2F4F5;
`;

export const RecordListWrapper = styled.div`
  width: 100%;
  padding: 24px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const DateTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #333;
  padding-left: 4px;
`;

export const RecordCard = styled.div`
  width: 100%;
  height: 90px;
  background-color: #F9FAFB;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  border: 1px solid #EDEDED;
  box-sizing: border-box;
`;

export const RecordInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;

  .label {
    font-size: 14px;
    font-weight: bold;
    color: #333;
  }

  .details {
    font-size: 13px;
    color: #888;
  }
`;

export const RecordImage = styled.div<{ $bgImage?: string | null }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #D9D9D9;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #666;
  flex-shrink: 0;
`;