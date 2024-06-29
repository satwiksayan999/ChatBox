import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuthContext } from './context/user_context';

function App() {

    const {authUser} = useAuthContext();
 

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
      <Route path="/" element={authUser ? <Home /> : <Navigate to={"/login"} />} ></Route>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} ></Route>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} > </Route>
      </Routes>
      <Toaster />

    </div>
  )
}

export default App;
