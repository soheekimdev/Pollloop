import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forms from './pages/forms';
import FormCreate from './pages/forms/FormCreate';
import FormDetail from './pages/forms/FormDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

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
