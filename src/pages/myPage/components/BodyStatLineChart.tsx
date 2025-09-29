import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

interface ChartData {
  date: string;
  muscle: number;
  bodyFat: number;
}

// 백엔드 API에서 받는 데이터 타입
interface ApiChartData {
  recordedAt: string;
  muscle: number;
  bodyFat: number;
}

// 서버 응답 타입
type FetchResult = ApiChartData[] | { message: string };

export default function BodyStatLineChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchChartData = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) {
        setErrorMessage("인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.");
        return;
      }

      const startDate = dayjs().subtract(3, "month").format("YYYY-MM-DD");
      const endDate = dayjs().format("YYYY-MM-DD");

      try {
        const url = `https://hanseifitu.shop/physical-infos/muscle-bodyfat?startDate=${startDate}&endDate=${endDate}`;

        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 401) {
          setErrorMessage("인증 실패: 토큰이 없거나 만료되었습니다.");
          return;
        }

        const text = await res.text();

        // HTML 반환 체크
        if (text.startsWith("<")) {
          setErrorMessage("서버에서 예상치 못한 HTML 응답이 반환되었습니다.");
          return;
        }

        const result: FetchResult = JSON.parse(text);

        // JSON 배열인지 확인
        if (!Array.isArray(result)) {
          setErrorMessage("서버에서 예상치 못한 데이터 구조가 반환되었습니다.");
          return;
        }

        const formatted: ChartData[] = result.map((entry) => ({
          date: dayjs(entry.recordedAt).format("YY-MM-DD"),
          muscle: entry.muscle,
          bodyFat: entry.bodyFat,
        }));

        if (formatted.length === 0) {
          setErrorMessage("최근 3개월간 기록된 데이터가 없습니다.");
        } else {
          setData(formatted);
        }
      } catch (err) {
        setErrorMessage(`차트 데이터 불러오기 실패: ${err instanceof Error ? err.message : err}`);
      }
    };

    fetchChartData();
  }, []);

  return (
    <ChartContainer>
      {errorMessage ? (
        <p style={{ color: "#6c757d", fontSize: "16px", textAlign: "center", padding: "0 20px" }}>
          {errorMessage}
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 55, bottom: 20 }}>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-40}
              height={55}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="muscle" stroke="#8884d8" name="골격근량" />
            <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="체지방률" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
