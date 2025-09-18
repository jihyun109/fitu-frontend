import React, { useState } from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Step1Form from "./components/Step1Form";
import Step2Form from "./components/Step2Form";

const MoreInfo: React.FC = () => {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  return (
    <Wrapper>
      <Header step={step} onBack={handleBack} />
      <Contents>
        {step === 1 && <Step1Form onNext={handleNext} />}
        {step === 2 && <Step2Form />}
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