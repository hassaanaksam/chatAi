import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import UserInterface from './pages/ChatAi';
import Login from './pages/Login';
import Home from './pages/AdminHome';
import Signup from './pages/Signup';
import SubmitForm from './pages/SubmitForm';
import UserHome from './pages/UserHome';
import AdminSignup from './pages/AdminSignup';
import UpdatedData from './pages/UpdatedData';
import UpdateForm from './pages/UpdateForm';


function App() {

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const user = role === "user"
  const admin = role === "admin"

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminsignup" element={token && admin ? <AdminSignup /> : <Login />} />
            <Route path="/" element={token && admin ? <Home /> : <Login />} />
            <Route path="/submitform" element={token && admin ? <SubmitForm /> : <Login />} />
            <Route path="/updateddata" element={token && admin ? <UpdatedData /> : <Login />} />
            <Route path="/updateform/:id" element={token && admin ? <UpdateForm /> : <Login />} />
            <Route path="/home" element={token && user ? <UserHome /> : <Login />} />
            <Route path="/userinterface" element={token ? <UserInterface /> : <Login />} />
            
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
