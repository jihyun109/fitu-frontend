import styled, { keyframes, css } from "styled-components";
import { X } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../apis/axiosInstance";

interface MainWritingProps {
  onClose: () => void;
  category: "FREE_BOARD" | "WORKOUT_INFO" | "WORKOUT_MATE";
}
const categoryLabels: { [key: string]: string } = {
  FREE_BOARD: "자유게시판",
  WORKOUT_INFO: "정보게시판",
  WORKOUT_MATE: "메이트게시판",
};

const MainWriting = ({ onClose, category }: MainWritingProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseTrigger = () => {
    setIsClosing(true);
  };

  const handleAnimationEnd = () => {
    if (isClosing) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (title.trim() === "") {
      alert("제목을 입력해주세요.");
      return;
    }
    if (content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    }
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await axiosInstance.post("/api/v2/posts", {
        category: category,
        title: title,
        contents: content,
      });
      alert("게시글이 등록되었습니다.");
      handleCloseTrigger();
    } catch(error){
      alert("게시글 등록을 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Container 
        $isClosing={isClosing} 
        onAnimationEnd={handleAnimationEnd}
      >
        <HeaderRow>
          <LeftGroup>
            <Chip>제목</Chip>
            <TitleInput 
              placeholder="제목을 입력하세요" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </LeftGroup>
          <CloseButton onClick={handleCloseTrigger}>
            <X size={20} color="#17a1fa" />
          </CloseButton>
        </HeaderRow>

        <Row>
          <Chip>{categoryLabels[category]}</Chip>
          <RegisterButton onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "등록 중..." : "등록하기"}
            </RegisterButton>
        </Row>

        <ContentBox>
          <StyledTextArea 
            placeholder="내용을 입력하세요." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </ContentBox>
      </Container>
    </Wrapper>
  );
};

export default MainWriting;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const Wrapper = styled.div`
  position: absolute; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  z-index: 50; 
  
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div<{ $isClosing: boolean }>`
  width: 85%;
  height: 80%;
  background: white;
  border-radius: 12px 12px 0 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${({ $isClosing }) => 
    $isClosing 
      ? css`${slideDown} 0.3s ease-in-out forwards` 
      : css`${slideUp} 0.3s ease-out forwards`
  };
  
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
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