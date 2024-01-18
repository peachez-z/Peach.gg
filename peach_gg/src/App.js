// App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import PasswordPage from "./components/PasswordPage";
import MemberMain from "./components/member/MemberMain";
import TotalDamage from "./components/TotalDamage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PasswordPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/membermain" element={<MemberMain />} />
        <Route path="/totalinfo" element={<TotalDamage />} />
      </Routes>
    </Router>
  );
}

export default App;
