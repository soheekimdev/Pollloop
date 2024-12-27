import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forms from './pages/forms';
import FormCreate from './pages/forms/FormCreate';
import FormDetail from './pages/forms/FormDetail';
import AccountLayout from './layouts/AccountLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AccountLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="forms">
            <Route index element={<Forms />} />
            <Route path="create" element={<FormCreate />} />
            <Route path=":formId" element={<FormDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
