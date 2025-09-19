import "./App.css";
import Login from "./pages/login/Login";
import AdminLogin from "./pages/adminLogin/adminLogin";
import AdminPage from "./pages/adminMain/adminPage";
import AdminRequest from "./pages/adminMain/adminRequest";
import AdminPost from "./pages/adminMain/adminPost";
import AdminMember from "./pages/adminMain/adminMember";
import MyPage from "./pages/myPage/MyPage";
import { Route, Routes, useLocation } from "react-router-dom";
import MoreInfo from "./pages/login/moreInfo/MoreInfo";
import KakaoOauth from "./pages/login/KakaoOauth";
import MainPage from "./pages/mianPage/mainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/login/oauth" element={<KakaoOauth />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminRequest />} />
          <Route path="request" element={<AdminRequest />} />
          <Route path="post" element={<AdminPost />} />
          <Route path="member" element={<AdminMember />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<MoreInfo />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </div>
  );
}

export default App;
