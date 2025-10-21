import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MedalRanking from "./components/MedalRanking";
import axiosInstance from "../../apis/axiosInstance";

type RankingItem = {
  rank: number | string;
  name: string;
  value?: number | string;
  unit?: string;
  isMe?: boolean;
  exercises?: string[];
  imgURL?: string;
};

const Medal: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const type = params.get("type") ?? "3대500";

  const normalizedType =
    type.replace(/\s/g, "") === "3대500" || type.includes("3대")
      ? "3대500"
      : type.replace(/\s/g, "") === "규칙적운동" || type === "규칙적 운동"
      ? "규칙적운동"
      : type;

  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [showInfoText, setShowInfoText] = useState(false);
  const [updateTime, setUpdateTime] = useState<string>("");

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        let response;
        if (normalizedType === "3대500") {
          response = await axiosInstance.get("/api/v2/ranking/total500");
          const { rankingItems, myRanking, myTotal500Record } = response.data;

          const formattedData: RankingItem[] = rankingItems.map((item: any) => ({
            rank: item.ranking,
            name: item.userName,
            value: item.amount,
            unit: "3대",
            imgURL: item.profileImageUrl,
          }));
          formattedData.push({
            rank: myRanking.ranking,
            name: myRanking.userName,
            value: myRanking.amount,
            unit: "3대",
            isMe: true,
            imgURL: myRanking.profileImageUrl,
            exercises: [
              `벤치프레스 ${myTotal500Record.benchPress}`,
              `데드리프트 ${myTotal500Record.deadLift}`,
              `스쿼트 ${myTotal500Record.squat}`,
            ],
          });

          setRankingData(formattedData);
          setShowInfoText(false);
        } else if (normalizedType === "규칙적운동") {
          response = await axiosInstance.get("/api/v2/ranking/workout-count");
          const { rankingItems, myRanking } = response.data;

          const formattedData: RankingItem[] = rankingItems.map((item: any) => ({
            rank: item.ranking,
            name: item.userName,
            value: item.amount,
            unit: "회",
            imgURL: item.profileImageUrl,
          }));

          formattedData.push({
            rank: myRanking.ranking,
            name: myRanking.userName,
            value: myRanking.amount,
            unit: "회",
            isMe: true,
            imgURL: myRanking.profileImageUrl,
          });

          setRankingData(formattedData);
          setShowInfoText(true);
        }

        setUpdateTime(new Date().toLocaleString());
      } catch (error) {
        console.error("랭킹 데이터 불러오기 실패:", error);
      }
    };

    fetchRanking();
  }, [normalizedType]);

  return (
    <MedalRanking
      title={type}
      rankingData={rankingData}
      showInfoText={showInfoText}
      updateTime={updateTime}
    />
  );
};

export default Medal;