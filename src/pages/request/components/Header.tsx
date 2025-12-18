import { useState } from "react";
import styled from "styled-components";

type HeaderProps = {
  onChange: (value: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onChange }) => {
  const [selected, setSelected] = useState<string>("");

  const list = [
    { label: "벤치프레스", value: "BENCH_PRESS" },
    { label: "데드리프트", value: "DEADLIFT" },
    { label: "스쿼트", value: "SQUAT" },
  ];

  const handleClick = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <Wrapper>
      {list.map((item) => (
        <Button
          key={item.value}
          $active={selected === item.value}
          onClick={() => handleClick(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 80px;
`;

const Button = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  border: none;
  cursor: pointer;

  background-color: ${({ $active }) =>
    $active ? "#1e90ff" : "#f1f3f5"};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};

  transition: all 0.2s ease;
`;
