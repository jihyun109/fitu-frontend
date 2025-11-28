import React from "react"
import styled from "styled-components"

const ExerciseBTN = ()=>{

return(
    <Container>
        <CustomBTN>커스텀하기</CustomBTN>
        <CustomBTN style={{backgroundColor:'white', color:'#007AFF', border:'1px solid #007AFF'}}>루틴 추천받기</CustomBTN>
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