import React from "react"
import styled from "styled-components"

const ExerciseBTN = ()=>{

return(
    <Container>
        <CustomBTN>커스텀하기</CustomBTN>
    </Container>
)

}

export default ExerciseBTN

const Container = styled.div`
    display  :flex ;
    flex-direction: column;
    width: 100%;
    align-items: center;
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
`;