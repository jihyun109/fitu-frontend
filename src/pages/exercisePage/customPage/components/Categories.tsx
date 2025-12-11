import styled from "styled-components"

const Categories = ({ selected, onSelect }: { selected?: string; onSelect?: (s: string) => void }) => {
    const cats = ["어깨","가슴","등","팔","하체"]
    return (
        <Container>
          <PillRow>
            {cats.map((t) => (
              <Pill key={t} active={t === selected} onClick={() => onSelect?.(t)}>{t}</Pill>
            ))}
          </PillRow>
        </Container>   
    )
}

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