import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 100vh;
  padding-bottom: 50px;
`;

export const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
`;

export const TopSummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 24px;
  margin-bottom: 10px;

  .text-info {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 13px;
    color: #999;
    font-weight: 500;
  }

  .value {
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }
`;

export const OhWoonWanImage = styled.div<{ $bgImage?: string | null }>`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: #D9D9D9;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  color: #666;
  font-weight: bold;
  white-space: pre-wrap;
`;

export const ExerciseCard = styled.div`
  width: 100%;
  background-color: #EFEFEF;
  border-radius: 12px;
  display: flex;
  padding: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  gap: 16px;
`;

export const ExerciseImage = styled.div<{ $bgImage?: string | null }>`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #D0D0D0;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;
  color: #666;
  flex-shrink: 0;
  white-space: pre-wrap;
`;

export const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  .exercise-name {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }

  .sets-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const SetRow = styled.div`
  font-size: 14px;
  color: #555;
  
  .set-num {
    color: #888;
    font-size: 13px;
  }
`;