import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../../apis/axiosInstance"
const ExerciseBTN = ({onRecommend}:{onRecommend:()=>void})=>{
const navigate = useNavigate();

return(
    <Container>
        <CustomBTN onClick={()=>{navigate('/exercise/custom')}}>커스텀하기</CustomBTN>
        <CustomBTN onClick={onRecommend} style={{backgroundColor:'white', color:'#007AFF', border:'1px solid #007AFF'}}>루틴 추천받기</CustomBTN>
    </Container>
)

}

export default ExerciseBTN

const Container = styled.div`
    display  :flex ;
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 10px;
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