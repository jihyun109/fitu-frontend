import BackButton from "../../components/BackButton";
import styled from "styled-components";
import Header from "./components/Header";
import VideoInput from "./components/VideoInput";
import GuideNotice from "./components/GuideNotice";
import { useState } from "react";
const Request = () => {
    const [Exercise, setExercise] = useState<string>("");
    console.log(Exercise);
  return (
    <Container>
    <BackButton>인증하기</BackButton>
   
    <Header onChange={setExercise}/>
     <Layout>
    <VideoInput/>
      <WeightInput
        type="number"
        placeholder="운동 무게를 입력하세요(kg)"
        id="weight-input"
      />
      <GuideNotice/>
      </Layout>
        <CustomBTN>인증하기</CustomBTN>
    </Container>
  )
}
export default Request;

const Container = styled.div`
display: flex;
width: 100%;
box-sizing: border-box;
height: 100vh;
padding:20px;
flex-direction: column;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;              
  overflow-y: auto;  
`;

const WeightInput = styled.input`
  height: 48px;
  font-size: 16px;
  padding: 0 12px;
  border: none;
  border-bottom: 1px solid #ddd;
  background: transparent;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
`;

const CustomBTN = styled.button`
    width: 100%;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color:#007AFF;
    color: white;
    height: 56px;
    border-radius: 12px;
    border: none;
    font-size: 18px;
`;