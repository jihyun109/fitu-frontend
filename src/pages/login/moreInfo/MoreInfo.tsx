import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import { FormData } from "../../../types/type";
import axiosInstance from "../../../apis/axiosInstance";
const MoreInfo: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    universityEmail: "",
    height: "",
    weight: "",
    muscle: "",
    bodyFat: "",
    gender: "M",
  });

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

 const handleSubmit = async () => {
  try {
    const res = await axiosInstance.post("/users/info", {
      name: formData.name,
      universityEmail: formData.universityEmail,
      height: formData.height,
      weight: formData.weight,
      muscle: formData.muscle,
      bodyFat: formData.bodyFat,
      gender: formData.gender,
    });

    if (res.status === 200) {
      console.log("제출 성공:", res.data);
      alert("회원가입 성공!");
    } else {
      console.log("응답 코드:", res.status);
      alert("회원가입 실패!");
    }
  } catch (error) {
    console.error("제출 오류:", error);
    alert("서버 오류가 발생했습니다.");
  }
};


  return (
    <Wrapper>
      <Header step={step} onBack={handleBack} />
      <Contents>
        {step === 1 && (
          <Step1Form
            formData={formData}
            setFormData={setFormData}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <Step2Form
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
          />
        )}
      </Contents>
    </Wrapper>
  );
};

export default MoreInfo;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Contents = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 24px;
`;
