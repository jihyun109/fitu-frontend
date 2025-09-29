import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";
import { FormData } from "../../../types/type";

const MoreInfo: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    height: "",
    weight: "",
    muscle: "",
    fat: "",
    gender: "M",
  });

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleSubmit = () => {
    console.log("최종 제출 데이터:", formData);
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
