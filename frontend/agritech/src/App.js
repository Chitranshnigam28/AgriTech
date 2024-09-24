import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './auth/login/Login';
import Header from './header/Header';
import Signup from './auth/signup/Signup'
import Dashboard from './dashboard/Dashboard'

function App() {
  return (
    <Router>
      <>
        <h1 className='text-center'>Welcome to AgriTech.</h1>
        <Header></Header>
        <Routes>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Signup></Signup>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </>
    </Router> 
  );
}

export default App;
