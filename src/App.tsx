import './App.css';
import Login from './pages/login/Login';
import AdminLogin from './pages/adminLogin/adminLogin';
import { Route, Routes, useLocation } from "react-router-dom";
import MoreInfo from './pages/login/moreInfo/MoreInfo';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/signup' element={<MoreInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
