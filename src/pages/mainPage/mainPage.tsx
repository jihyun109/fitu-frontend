import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Search, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../assets/images/ArrowDown.png";

const MainPage = () => {
  const navigate = useNavigate();
  let name = "한세대";

  const handleCardClick = (type: string) => {
    navigate(`medal/${type}`);
  };

  return (
    <Wrapper>
      <Header name={name} />
      <MainContent>
        <CardContainer>
          <Card onClick={() => handleCardClick("3대500")}>
            <div className="title">3대500 🏅</div>
            <div className="sub">자세히 &gt;</div>
          </Card>
          <Card onClick={() => handleCardClick("규칙적운동")}>
            <div className="title">규칙적 운동 🏅</div>
            <div className="sub">자세히 &gt;</div>
          </Card>
        </CardContainer>

        <SearchBar>
          <Search size={18} color="#A0A0A0" />
          <input type="text" placeholder="검색어를 입력해주세요." />
        </SearchBar>

        <Board>
          <BoardHeader>
            <img src={ArrowDown} />
            자유게시판
          </BoardHeader>
          <BoardList>
            {Array.from({ length: 30 }).map((_, i) => (
              <BoardItem key={i}>
                <div className="title">가나다라마바사</div>
                <div className="content">
                  아자차카타파하가나다라마바사아자차카타파하가나다라마바사
                </div>
                <div className="date">08.{10 - i} | 홍길동</div>
              </BoardItem>
            ))}
            <div style={{ height: "50px" }} />
          </BoardList>

          <WriteButton>
            <Pencil size={18} />
          </WriteButton>
        </Board>
      </MainContent>

      <Footer />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f2f4f5;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px 16px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  height: 90px;
  flex-shrink: 0;
`;

const Card = styled.div`
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    font-weight: bold;
    font-size: 16px;
  }
  .sub {
    font-size: 13px;
    color: #555;
    text-align: right;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 16px;
  flex-shrink: 0;

  input {
    border: none;
    outline: none;
    flex: 1;
    margin-left: 8px;
    font-size: 14px;
    background: transparent;
  }
`;

const Board = styled.div`
  position: relative;
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 10px 0 10px;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const BoardHeader = styled.div`
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #f2f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 127px;
  height: 27px;
  margin: 0 0 10px 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  img {
    padding-right: 5px;
  }
`;

const BoardList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 12px 0;
  min-height: 0;
  border-top: 1px solid #eee;
`;

const BoardItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;

  .title {
    font-weight: bold;
    font-size: 14px;
  }

  .content {
    font-size: 13px;
    color: #555;
    margin: 2px 0;
  }

  .date {
    font-size: 12px;
    color: gray;
    text-align: right;
  }
`;

const WriteButton = styled.button`
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: #17a1fa;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
