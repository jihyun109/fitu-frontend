import styled from "styled-components";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface MainWritingProps {
  onClose: () => void;
}

const MainWriting = ({ onClose }: MainWritingProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Overlay>
      <Container>
        <HeaderRow>
          <LeftGroup>
            <Chip>제목</Chip>
            <TitleInput 
              placeholder="제목을 입력하세요" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </LeftGroup>
          <CloseButton onClick={onClose}>
            <X size={20} color="#17a1fa" />
          </CloseButton>
        </HeaderRow>

        <Row>
          <Chip>자유게시판</Chip>
          <RegisterButton>등록하기</RegisterButton>
        </Row>

        <ContentBox>
          <StyledTextArea 
            placeholder="내용을 입력하세요." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentBox>
      </Container>
    </Overlay>
  );
};

export default MainWriting;

const Overlay = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  height: 70vh;
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderRow = styled(Row)`
  gap: 8px;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

const Chip = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  flex-shrink: 0;
`;

const TitleInput = styled.input`
  flex: 1;
  height: 34px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-bottom: 1px solid #eee;
  outline: none;
  background: transparent;
  padding: 0 4px;
  
  &::placeholder {
    color: #ccc;
    font-weight: normal;
    font-size: 14px;
  }

  &:focus {
    border-bottom: 1px solid #17a1fa;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RegisterButton = styled.button`
  height: 34px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  background-color: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);

  &:active {
    background-color: #f5f5f5;
  }
`;

const ContentBox = styled.div`
  flex: 1;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

const StyledTextArea = styled.textarea`
  flex: 1;
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  font-size: 15px;
  line-height: 1.6;
  color: #333;

  &::placeholder {
    color: #ccc;
  }
`;