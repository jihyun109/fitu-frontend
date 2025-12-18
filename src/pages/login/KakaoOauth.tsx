import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import axiosInstance from "../../apis/axiosInstance";

const KakaoOauth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    if (code) {
      const fetchData = async () => {
        try {
          const response = await getPrintCode(code);
          console.log(response);

          const jwtToken = response.data.token;
          const userid = response.data.userid;
          sessionStorage.setItem("Authorization", jwtToken);
          sessionStorage.setItem("userid", userid);

          if (response.status === 201) {
            navigate("/home");
          } else if (response.status === 200) {
            navigate("/home");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    } else {
      navigate("/login");
    }
  }, []);

  async function getPrintCode(code: string) {
    const res = await axiosInstance.post(
      `/auth/login/kakao?code=${code}`
    );
    return res;
  }

  return (
    <Container>
      <Spinner />
      <p>로그인 중...</p>
    </Container>
  );
};

export default KakaoOauth;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 6px solid #f3f3f3; 
  border-top: 6px solid #007bff; 
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;
