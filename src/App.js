import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import UserInterface from './pages/UserInterface';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SubmitForm from './pages/SubmitForm';
import UserHome from './pages/UserHome';


function App() {

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={token ? <Home /> : <Login />} />
            <Route path="/home" element={token ? <UserHome /> : <Login />} />
            <Route path="/signup" element={token ? <Signup /> : <Login />} />
            <Route path="/userinterface" element={token ? <UserInterface /> : <Login />} />
            <Route path="/submitform" element={token ? <SubmitForm /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
