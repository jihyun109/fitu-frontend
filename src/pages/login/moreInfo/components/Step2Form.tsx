import React from "react";
import styled from "styled-components";
import { FormData } from "../../../../types/type";

interface Step2FormProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
}

const Step2Form: React.FC<Step2FormProps> = ({ formData, setFormData, onSubmit }) => {
const isButtonEnabled =
  formData.height !== "" &&
  formData.weight !== "" &&
  (formData.gender === "M" || formData.gender === "F");

  return (
    <Form>
      <Title>신체 정보</Title>

      <Label>키와 몸무게</Label>
      <Row>
        <Input
          type="number"
          style={{ width: "80px" }}
          value={formData.height}
          onChange={(e) => setFormData({ ...formData, height: e.target.value })}
        />
        <Unit>cm</Unit>
        <Input
          type="number"
          style={{ width: "80px" }}
          value={formData.weight}
          onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        />
        <Unit>kg</Unit>
      </Row>

      <Label>골격근량(선택)</Label>
      <Row>
        <Input
          type="number"
          value={formData.muscle}
          onChange={(e) => setFormData({ ...formData, muscle: e.target.value })}
        />
        <Unit>kg</Unit>
      </Row>

      <Label>체지방률(선택)</Label>
      <Row>
        <Input
          type="number"
          value={formData.bodyFat}
          onChange={(e) => setFormData({ ...formData, bodyFat: e.target.value })}
        />
        <Unit>%</Unit>
      </Row>

      <Label>성별</Label>
      <GenderRow>
        <GenderButton
          selected={formData.gender === "M"}
          onClick={() => setFormData({ ...formData, gender: "M" })}
        >
          남성
        </GenderButton>
        <GenderButton
          selected={formData.gender === "F"}
          onClick={() => setFormData({ ...formData, gender: "F" })}
        >
          여성
        </GenderButton>
      </GenderRow>

      <NextButton onClick={onSubmit} disabled={!isButtonEnabled}>
        가입하기
      </NextButton>
    </Form>
  );
};

export default Step2Form;

const Form = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 20px;
  font-weight: bold;
`;

const Label = styled.label`
  font-size: 17px;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Input = styled.input`
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  text-align: right;
`;

const Unit = styled.span`
  font-size: 14px;
  color: #555;
`;

const GenderRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const GenderButton = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.selected ? "#007bff" : "#ddd")};
  background: ${(props) => (props.selected ? "#007bff" : "#f9f9f9")};
  color: ${(props) => (props.selected ? "white" : "black")};
  cursor: pointer;
`;

const NextButton = styled.button<{ disabled: boolean }>`
  padding: 14px;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: white;
  border: none;
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  width: calc(100% - 40px);
  max-width: 400px;
  transition: background 0.3s;
`;
