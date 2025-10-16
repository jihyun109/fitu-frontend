import styled from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Search, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../assets/images/ArrowDown.png";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/axiosInstance";

interface Post {
  id: number;
  universityName: string;
  category: string;
  title: string;
  contents: string;
  createdAt: string;
}

const MainPage = () => {
  const navigate = useNavigate();
  const [uniName, setUniName] = useState("한세대");
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<
    "FREE_BOARD" | "WORKOUT_INFO" | "WORKOUT_MATE"
  >("FREE_BOARD");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const options = [
    { value: "FREE_BOARD", label: "자유게시판" },
    { value: "WORKOUT_INFO", label: "정보게시판" },
    { value: "WORKOUT_MATE", label: "메이트게시판" },
  ];

  const fetchPosts = async (pageNum: number, selectedCategory = category) => {
    if (isLoading || (!hasNext && pageNum !== 0)) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/api/v2/posts", {
        params: { category: selectedCategory, page: pageNum },
      });
      const data = res.data;
      if (pageNum === 0) setPosts(data.content);
      else setPosts((prev) => [...prev, ...data.content]);
      setHasNext(data.hasNext);
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  const handleLoadMore = () => {
    fetchPosts(page + 1);
    setPage((prev) => prev + 1);
  };

  const handleCardClick = (type: string) => navigate(`medal/${type}`);
  const handlePostClick = (id: number) => navigate(`/home/detail/${id}`);

  const handleCategorySelect = (value: typeof category) => {
    setCategory(value);
    setDropdownOpen(false);
    setPage(0);
    setPosts([]);
    setHasNext(true);
    fetchPosts(0, value);
  };

  const fetchSearchPosts = async (
    keyword: string,
    pageNum: number = 0,
    selectedCategory = category
  ) => {
    if (isLoading || (!hasNext && pageNum !== 0)) return;
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/api/v2/posts/search", {
        params: {
          category: selectedCategory,
          keyword,
          page: pageNum,
          size: 20,
        },
      });
      const data = res.data;
      if (pageNum === 0) setPosts(data.content);
      else setPosts((prev) => [...prev, ...data.content]);
      setHasNext(data.hasNext);
    } catch (err) {
      console.error("검색 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    setPage(0);
    setHasNext(true);
    fetchSearchPosts(searchKeyword, 0, category);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <Wrapper>
      <Header name={uniName} />
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
          <Search
            size={18}
            color="#A0A0A0"
            onClick={() => handleSearchSubmit()}
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </SearchBar>

        <Board>
          <BoardHeaderContainer>
            <BoardHeader onClick={() => setDropdownOpen((prev) => !prev)}>
              <img src={ArrowDown} alt="dropdown" />
              {options.find((opt) => opt.value === category)?.label}
            </BoardHeader>
            <DropdownList open={dropdownOpen}>
              {options.map((opt) => (
                <DropdownItem
                  key={opt.value}
                  onClick={() =>
                    handleCategorySelect(opt.value as typeof category)
                  }
                >
                  {opt.label}
                </DropdownItem>
              ))}
            </DropdownList>
          </BoardHeaderContainer>

          <BoardList>
            {posts.map((post) => (
              <BoardItem key={post.id} onClick={() => handlePostClick(post.id)}>
                <div className="title">{post.title}</div>
                <div className="content">{post.contents}</div>
                <div className="date">
                  {new Date(post.createdAt).toLocaleDateString("ko-KR")} |{" "}
                  {post.universityName}
                </div>
              </BoardItem>
            ))}
            {isLoading && <LoadingText>불러오는 중...</LoadingText>}
            {!isLoading && hasNext && (
              <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
            )}
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

const BoardHeaderContainer = styled.div`
  position: relative;
  max-width: 124px;
  margin: 0 0 10px 12px;
`;

const BoardHeader = styled.div`
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #f2f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  gap: 10px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  img {
    width: 12px;
    margin-left: 5px;
  }
`;

const DropdownList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid #f2f4f6;
  border-radius: 8px;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: ${({ open }) => (open ? "block" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f2f4f6;
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

const LoadingText = styled.div`
  text-align: center;
  font-size: 13px;
  color: #777;
  margin: 12px 0;
`;

const LoadMoreButton = styled.button`
  margin: 12px auto;
  padding: 8px 16px;
  border: none;
  background-color: #e9f5ff;
  color: #17a1fa;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #d9efff;
  }
`;
