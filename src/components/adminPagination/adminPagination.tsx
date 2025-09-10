import React from "react";
import styled from "styled-components";
import LeftArrow from "../../assets/images/LeftArrow.png";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageButtons = 10,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startPage =
    Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) endPage = totalPages;

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Container>
      {startPage > 1 && (
        <PageButton onClick={() => onPageChange(startPage - 1)}>
          <img src={LeftArrow} alt="left" />
        </PageButton>
      )}

      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      {endPage < totalPages && (
        <PageButton onClick={() => onPageChange(endPage + 1)}>
          {" "}
          <img
            src={LeftArrow}
            alt="right"
            style={{ transform: "scaleX(-1)" }}
          />
        </PageButton>
      )}
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  margin: 4px 4px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  background-color: ${({ active }) => (active ? "#e2e2e2" : "transparent")};
  color: ${({ active }) => (active ? "#4d4d4d" : "#6E6E6E")};
  border: none;
`;
