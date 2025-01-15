import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './layouts/DashboardLayout';
import FormLayout from './layouts/FormLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forms from './pages/forms';
import FormCreate from './pages/forms/FormCreate';
import FormDetail from './pages/forms/FormDetail';
import FormResponse from './pages/forms/FormResponse';
import AccountLayout from './layouts/AccountLayout';
import Profile from './pages/auth/Profile';
import KakaoCallback from './pages/auth/KakaoCallback';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import RequestPasswordReset from './pages/auth/RequestPasswordReset';
import ResetPassword from './pages/auth/ResetPassword';
import CustomToastContainer from './components/common/CustomToastContainer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route element={<AccountLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="password" element={<RequestPasswordReset />} />
            <Route path="reset-password/:uuid/:token" element={<ResetPassword />} />
            <Route path="auth/kakao/callback" element={<KakaoCallback />} />
          </Route>
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="forms">
              <Route index element={<Forms />} />
              <Route path="create/:formId?" element={<FormCreate />} />
              <Route path=":formId" element={<FormDetail />} />
            </Route>
          </Route>

          <Route element={<FormLayout />}>
            <Route path="forms">
              <Route path="response/:formId" element={<FormResponse />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <CustomToastContainer />
    </BrowserRouter>
  );
}

export default App;
