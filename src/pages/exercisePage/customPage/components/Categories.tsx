import styled from "styled-components"

type Category = {
  label: string;  
  value: string;  
};

const Categories = ({
  selected,
  onSelect,
}: {
  selected?: string;
  onSelect?: (s: string) => void;
}) => {

  const cats: Category[] = [
    { label: "어깨", value: "shoulder" },
    { label: "가슴", value: "chest" },
    { label: "등", value: "back" },
    { label: "팔", value: "arm" },
    { label: "하체", value: "lower_part" },
  ];

  return (
    <Container>
      <PillRow>
        {cats.map((c) => (
          <Pill
            key={c.value}
            active={c.value === selected}
            onClick={() => onSelect?.(c.value)}
          >
            {c.label}
          </Pill>
        ))}
      </PillRow>
    </Container>
  );
};


export default Categories

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    align-items: center;
`

const PillRow = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 6px;
`

const Pill = styled.button<{active?: boolean}>`
  height: 32px;
  border-radius: 16px;
  padding: 0 15px;
  border: none;
  background: ${p => p.active ? "#0a84ff" : "#f1f1f1"};
  color: ${p => p.active ? "#fff" : "#444"};
  font-size: 13px;
  white-space: nowrap;
`