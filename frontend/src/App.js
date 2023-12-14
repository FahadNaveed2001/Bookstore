import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Accounts from './pages/Accounts';
import Settings from './pages/Settings'; 
import Navbar from './components/Navbar';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token');

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {isUserSignedIn && <Route path='/account' element={<Accounts />} />}

        {isUserSignedIn && <Route path='/settings' element={<Settings />} />}
      </Routes>
    </div>
  );
}

export default App;
