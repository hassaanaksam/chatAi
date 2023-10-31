import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import UserInterface from './pages/UserInterface';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import SubmitForm from './pages/SubmitForm';
import Logout from './components/Logout';


function App() {

  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/" element={token ? <Home /> : <Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/userinterface" element={<UserInterface />} />
            <Route path="/submitform" element={<SubmitForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
