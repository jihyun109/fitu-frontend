import React, { useState } from "react";
import styled from "styled-components";

type ThumbItem = { id: string; name: string; thumbnail?: string };
const Header =  ({ thumbs, onRemove }: { thumbs: ThumbItem[]; onRemove: (id: string) => void }) => {

  return (
    <Container>
      <Thumbs>
        {thumbs.map((item, i) => (
          <Thumb key={i}>
            <ThumbWrapper>
              <ThumbCircle ><img src={item.thumbnail} style={{width:'100%', height:'100%'}}/></ThumbCircle>
              <DeleteBtn onClick={() =>onRemove(item.id)}>×</DeleteBtn>
            </ThumbWrapper>
            <ThumbLabel>{item.name}</ThumbLabel>
          </Thumb>
        ))}
      </Thumbs>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 40px;
  overflow-x: auto;
   scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Thumbs = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 6px;
`;

const Thumb = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  flex: 0 0 auto;
`;

const ThumbWrapper = styled.div`
  position: relative;
  width: 56px;
  height: 56px;
  overflow: visible;
`;

const ThumbCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: #e9e9e9;
  border: 1px solid #ddd;
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: black;
  font-size: 20px;
  cursor: pointer;
`;

const ThumbLabel = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  text-align: center;
  line-height: 1.1;
`;
