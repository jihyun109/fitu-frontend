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
import MainPage from "./pages/mainPage/mainPage";
import InvitePage from "./pages/myPage/components/InvitePage";
import CalendarDetail from "./pages/myPage/components/CalendarDetail";
import MainDetail from "./pages/mainDetail/MainDetail";
import Medal from "./pages/medalPage/Medal";
import ExercisePage from "./pages/exercisePage/ExercisePage";
import ChatPage from "./pages/chatPage/chatPage";
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
        <Route path='/invite' element={<InvitePage/>}/>
        <Route path="/record/:date" element={<CalendarDetail />} />
        <Route path="/home/detail/:id" element={<MainDetail />} />
        <Route path="/home/medal" element={<Medal/>} />
        <Route path="/exercise" element={<ExercisePage/>} />
        <Route path="/chatlist" element={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App;
