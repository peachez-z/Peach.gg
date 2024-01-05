import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// 스타일 정의
const MainContainer = styled.div`
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  color: #ffffff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: italic;
  text-align: center;
  font-weight: bold;
  line-height: 1.5;
`;

// Main 컴포넌트
export default function Main() {
  return (
    <MainContainer>
      <div style={{ fontSize: 50, marginTop: "-80px" }}>STARY</div>
      <div style={{ fontSize: 20, marginTop: "20px" }}>
        {" "}
        <Link to="/membermain">MEMBER</Link>
      </div>
    </MainContainer>
  );
}
