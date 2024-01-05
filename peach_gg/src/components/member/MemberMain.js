import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Members from "./Members";

// 스타일 정의
const MainContainer = styled.div`
  background-image: url("/background.jpg");
  background-size: cover;
  background-position: center;
  color: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: italic;
  text-align: center;
  font-weight: bold;
  line-height: 1.5;
`;

export default function MemberMain() {
  return (
    <MainContainer>
      <div style={{ fontSize: 50, marginTop: "-80px" }}>STARY</div>
      <div style={{ fontSize: 30 }}>MEMBERS</div>
      <Members />
    </MainContainer>
  );
}
