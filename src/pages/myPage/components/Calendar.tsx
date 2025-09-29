// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { ko } from "date-fns/locale";
// import { useNavigate } from "react-router-dom";
// import axisInstance from "../../../apis/axiosInstance";
// import {
//   CalendarGlobalStyle,
//   CalendarWrapper,
//   DayPickerWrapper,
//   WorkoutListWrapper,
// } from "./styles/Calendar.styled";

// type WorkoutDetail = {
//   name: string;
//   categoryId: number;
//   sets: number;
//   weight: number;
//   repsPerSet: number;
// };

// type WorkoutRecord = {
//   date: string;
//   details: WorkoutDetail[];
// };

// type CalendarProps = {
//   month: Date;
//   onMonthChange: (date: Date) => void;
// };

// export default function Calendar({ month, onMonthChange }: CalendarProps) {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [records, setRecords] = useState<WorkoutRecord[]>([]);
//   const navigate = useNavigate();

//   // API 호출
//   const fetchWorkoutRecords = async (month: Date) => {
//     try {
//       const year = month.getFullYear();
//       const monthNumber = month.getMonth() + 1;
//       const token = sessionStorage.getItem("Authorization");
//       if (!token) throw new Error("토큰 없음");

//       const res = await axisInstance.get(
//         `/api/workout/calendar/full?year=${year}&month=${monthNumber}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setRecords(res.data);
//     } catch (err) {
//       console.error("운동 기록 불러오기 실패:", err);
//       setRecords([]);
//     }
//   };

//   useEffect(() => {
//     fetchWorkoutRecords(month);
//   }, [month]);

//   // 날짜별 기록 합치기
//   const recordsMap = new Map<string, WorkoutDetail[]>();
//   records.forEach(({ date, details }) => {
//     if (recordsMap.has(date)) {
//       recordsMap.set(date, [...recordsMap.get(date)!, ...details]);
//     } else {
//       recordsMap.set(date, details);
//     }
//   });

//   const selectedKey = format(selectedDate, "yyyy-MM-dd");
//   const selectedWorkouts = recordsMap.get(selectedKey) || [];

//   // 날짜 전체
//   const year = month.getFullYear();
//   const monthIndex = month.getMonth();
//   const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//   const allDatesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
//     const date = new Date(year, monthIndex, i + 1);
//     return format(date, "yyyy-MM-dd");
//   });

//   const recordedDates = new Set(records.map((r) => r.date));
//   const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));

//   return (
//     <CalendarWrapper>
//       <CalendarGlobalStyle />
//       <DayPickerWrapper>
//         <DayPicker
//           locale={ko}
//           mode="single"
//           month={month}
//           selected={selectedDate}
//           onSelect={(date) => date && setSelectedDate(date)}
//           onMonthChange={onMonthChange}
//           modifiers={{
//             recorded: Array.from(recordedDates).map((d) => new Date(d)),
//             noRecord: noRecordDates.map((d) => new Date(d)),
//           }}
//           modifiersClassNames={{
//             recorded: "recorded-day",
//             noRecord: "norecord-day",
//           }}
//           navLayout="around"
//         />
//       </DayPickerWrapper>

//       <div style={{ width: "100%", height: "10px", backgroundColor: "#F2F4F5", marginTop: "30px" }} />

//       <WorkoutListWrapper>
//         <p>{selectedKey}</p>
//         {selectedWorkouts.length > 0 ? (
//           <ul>
//             {selectedWorkouts.map((item, index) => (
//               <li
//                 key={index}
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   navigate("/workout-detail", { state: { workout: item, date: selectedKey } })
//                 }
//               >
//                 {item.name} <br />
//                 {item.sets}세트, {item.weight}kg, {item.repsPerSet}회
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>운동 기록 없음</p>
//         )}
//       </WorkoutListWrapper>
//     </CalendarWrapper>
//   );
// }

//api 연동 확인 전 코드(테스트 이후 삭제)
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import {
  CalendarGlobalStyle,
  CalendarWrapper,
  DayPickerWrapper,
  WorkoutListWrapper,
} from "./styles/Calendar.styled";

type WorkoutDetail = {
  name: string;
  categoryId: number;
  sets: number;
  weight: number;
  repsPerSet: number;
};

type WorkoutRecord = {
  date: string;
  workout: WorkoutDetail[];
};

type CalendarProps = {
  records: WorkoutRecord[];
  month: Date;
  onMonthChange: (date: Date) => void;
};

export default function Calendar({ records, month, onMonthChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  // 날짜별 운동 기록 맵
  const recordsMap = new Map<string, WorkoutRecord["workout"]>();
  records.forEach(({ date, workout }) => {
    recordsMap.set(date, workout);
  });

  // 월별 날짜 계산
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const allDatesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);
    return format(date, "yyyy-MM-dd");
  });

  // 기록 있는 날짜 / 없는 날짜
  const recordedDates = new Set(records.map((r) => r.date));
  const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));

  // 선택된 날짜와 운동 데이터
  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedWorkouts = recordsMap.get(selectedKey) || [];

  return (
    <CalendarWrapper>
      <CalendarGlobalStyle />
      <DayPickerWrapper>
        <DayPicker
          locale={ko}
          mode="single"
          month={month}
          selected={selectedDate}
          onSelect={(date) => date && setSelectedDate(date)}
          onMonthChange={onMonthChange}
          modifiers={{
            recorded: Array.from(recordedDates).map((d) => new Date(d)),
            noRecord: noRecordDates.map((d) => new Date(d)),
          }}
          modifiersClassNames={{
            recorded: "recorded-day",
            noRecord: "norecord-day",
          }}
          navLayout="around"
        />
      </DayPickerWrapper>

      <div
        style={{
          width: "150%",
          height: "10px",
          backgroundColor: "#F2F4F5",
          marginTop: "30px",
        }}
      />
      <WorkoutListWrapper>
        <p>{selectedKey}</p>
        {selectedWorkouts.length > 0 ? (
          <ul>
            {selectedWorkouts.map((item, index) => (
              <li
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/record/${selectedKey}`, { state: { workout: item } })
                }
              >
                {item.name} <br /> {item.sets}세트, {item.weight}kg, {item.repsPerSet}회
              </li>
            ))}
          </ul>
        ) : (
          <p>운동 기록 없음</p>
        )}
      </WorkoutListWrapper>
    </CalendarWrapper>
  );
}