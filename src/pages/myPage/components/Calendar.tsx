import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import {
  CalendarGlobalStyle,
  CalendarWrapper,
  DayPickerWrapper,
  WorkoutListWrapper,
} from "./styles/Calendar.styled";
import axiosInstance from "../../../apis/axiosInstance";

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
  const [fetchedRecords, setFetchedRecords] = useState<WorkoutRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const token = sessionStorage.getItem("Authorization");
        if (!token) return;

        const year = month.getFullYear();
        const monthParam = month.getMonth() + 1;

        const response = await axiosInstance.get(
          `/api/workout/calendar/full?year=${year}&month=${monthParam}`,
        );

        const data = response.data;

        const formatted: WorkoutRecord[] = data.map((item: any) => ({
          date: item.date,
          workout: (item.details ?? []).map((w: any) => ({
            name: w.name,
            categoryId: w.categoryId,
            sets: w.sets,
            weight: w.weight,
            repsPerSet: w.repsPerSet,
          })),
        }));

        setFetchedRecords(formatted);
      } catch (error) {
        console.error("캘린더 운동 데이터 불러오기 실패:", error);
      }
    };

    fetchCalendarData();
  }, [month]);

  const finalRecords = fetchedRecords.length > 0 ? fetchedRecords : records;

  const recordsMap = new Map<string, WorkoutRecord["workout"]>();
  finalRecords.forEach(({ date, workout }) => {
    recordsMap.set(date, workout);
  });

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const allDatesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);
    return format(date, "yyyy-MM-dd");
  });

  const recordedDates = new Set(finalRecords.map((r) => r.date));
  const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));

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