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
  RecordListWrapper,
  RecordCard,
  RecordInfo,
  RecordImage,
  DateTitle,
  Seperator,
} from "./styles/Calendar.styled";
import axiosInstance from "../../../apis/axiosInstance";

type CalendarRecord = {
  date: string;
  categoryId: number;
  categoryName: string;
  dailyPhoto: string | null;
};

type CalendarProps = {
  records?: any[]; 
  month: Date;
  onMonthChange: (date: Date) => void;
};

export default function Calendar({ month, onMonthChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fetchedRecords, setFetchedRecords] = useState<CalendarRecord[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const token = sessionStorage.getItem("Authorization");
        if (!token) return;

        const year = month.getFullYear();
        const monthParam = month.getMonth() + 1;

        const response = await axiosInstance.get(
          `/api/v2/workouts/calendar/full?year=${year}&month=${monthParam}`
        );

        setFetchedRecords(response.data);
      } catch (error) {
        console.error("캘린더 운동 데이터 불러오기 실패:", error);
      }
    };

    fetchCalendarData();
  }, [month]);
  const recordedDates = new Set(fetchedRecords.map((r) => r.date));

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const allDatesInMonth = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, monthIndex, i + 1);
    return format(date, "yyyy-MM-dd");
  });
  
  const noRecordDates = allDatesInMonth.filter((d) => !recordedDates.has(d));

  const selectedKey = format(selectedDate, "yyyy-MM-dd");
  const selectedDailyRecords = fetchedRecords.filter(
    (r) => r.date === selectedKey
  );

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

      <Seperator />

      <RecordListWrapper>
        <DateTitle>{format(selectedDate, "MM.dd")}</DateTitle>
        
        {selectedDailyRecords.length > 0 ? (
          selectedDailyRecords.map((record, index) => (
            <RecordCard
              key={index}
              onClick={() =>
                navigate(`/record/${selectedKey}`, { state: { record } })
              }
            >
              <RecordInfo>
                <span className="label">운동</span>
                <span className="details">{record.categoryName}</span>
              </RecordInfo>
              <RecordImage $bgImage={record.dailyPhoto}>
                 {!record.dailyPhoto && "사진 없음"}
              </RecordImage>
            </RecordCard>
          ))
        ) : (
          <p style={{ color: "#999", marginTop: "20px" }}>운동 기록이 없습니다.</p>
        )}
      </RecordListWrapper>
    </CalendarWrapper>
  );
}