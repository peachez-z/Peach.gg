import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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
export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "peach") {
      navigate("/main");
    } else {
      alert("비밀번호가 틀렸습니다 !");
    }
  };
  return (
    <MainContainer>
      <div style={{ fontSize: 50, marginTop: "-80px" }}>STARY</div>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">START</button>
      </form>
    </MainContainer>
  );
}
