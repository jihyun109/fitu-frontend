import React from 'react';
import styled from 'styled-components';

type Option = {
  label: string;
  value: string;
};

type SelectBoxProps = {
  selected: string[];
  onChange: (selected: string[]) => void;
};

type LabelProps = {
    checked: boolean;
};

const BodyPart: Option[] = [
  { label: '어깨', value: 'shoulder' },
  { label: '가슴', value: 'chest' },
  { label: '등', value: 'back' },
  { label: '팔', value: 'arm' },
  { label: '하체', value: 'leg' },
];

const SelectBox: React.FC<SelectBoxProps> = ({ selected, onChange }) => {
  const handleCheckboxChange = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };  

  return (
    <Container>
      {BodyPart.map((part) => {
        const isChecked = selected.includes(part.value);
        return (
          <Label key={part.value} checked={isChecked}>
            <Checkbox
              type='checkbox'
              value={part.value}
              checked={isChecked}
              onChange={() => handleCheckboxChange(part.value)}
            />
            <Span>{part.label}</Span>
          </Label>
        );
      })}
    </Container>
  );
};

export default SelectBox;

const Container = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  width: 100%;
`;

const Label = styled.label<LabelProps>`
  display: flex;
  align-items: center;
  gap: 16px; 
  background-color: ${props => props.checked ? '#F6FCFF' : '#F2F4F5'}; 
  padding: 10px 30px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 16px; 
  cursor: pointer;
  transition: all 0.2s ease;
  color: black;
  border: ${props => props.checked ? '2px solid #007AFF' : '2px solid transparent'}; 
  
  &:hover {
    background-color: ${props => props.checked ? '#F6FCFF' : '#F6FCFF'};
  }
`;

const Checkbox = styled.input`
  accent-color: #e45258;
  cursor: pointer;
  margin: 0;
  display: none;
`;

const Span = styled.span`
  font-size: 18px;
  font-weight: 600;
`;