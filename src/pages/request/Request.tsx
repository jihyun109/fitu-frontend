import BackButton from "../../components/BackButton";
import styled from "styled-components";
import Header from "./components/Header";
import VideoInput from "./components/VideoInput";
import GuideNotice from "./components/GuideNotice";
import { useState } from "react";
import axiosInstance from "../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
const Request = () => {
  const [Exercise, setExercise] = useState<string>("");
  const [weight, setWeight] = useState<number>(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (!Exercise || !videoFile || weight <= 0) {
      alert("운동 종류, 영상과 무게를 모두 입력해주세요.");
      return;
    }
    const formData = new FormData();
    
    const requestData = {
      workoutVerificationType: Exercise,
      weight: weight
    };
    formData.append("request", new Blob([JSON.stringify(requestData)], { type: "application/json" }));
    formData.append("video", videoFile);
    try {
      const response = await axiosInstance.post("/api/v2/workout-verification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("인증 요청 성공!");
      navigate('/home')
      console.log(response.data);
    } catch (error) {
      console.error("인증 요청 실패:", error);
      alert("전송에 실패했습니다.");
    }
  };

  return (
    <Container>
      <BackButton>인증하기</BackButton>

      <Header onChange={setExercise} />
      <Layout>
        <VideoInput setVideoFile={setVideoFile} />
        <WeightInput
          type="number"
          placeholder="운동 무게를 입력하세요(kg)"
          id="weight-input"
          value={weight || ""}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <GuideNotice />
      </Layout>
      <CustomBTN onClick={handleSubmit}>인증하기</CustomBTN>
    </Container>
  );
};
export default Request;

const Container = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  padding: 20px;
  flex-direction: column;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const WeightInput = styled.input`
  height: 48px;
  font-size: 16px;
  padding: 0 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
`;

const CustomBTN = styled.button`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #007aff;
  color: white;
  height: 56px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
`;
