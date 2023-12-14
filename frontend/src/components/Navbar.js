import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './navbar.scss';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const isUserSignedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className='navbar'>
      <Link to='/'>
        <h1 className='Heading'>Book-Store By Fahad</h1>
      </Link>
      <ul className='wrapper'>
        {isUserSignedIn ? (
          <div className='wrapper1'>
            <li className='dropdown'>
              <button className='btn9' onClick={toggleDropdown}>
                Account ⇩
              </button>
              {showDropdown && (
                <div className='dropdown-content'>
                  <Link to='/Settings'>
                    <motion.button
                      className='btn10'
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.1 }}>
                      Settings
                    </motion.button>
                  </Link>
                  <motion.button
                    className='btn10'
                    initial={{ opacity: 0, y: 90 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </motion.button>
                </div>
              )}
            </li>
          </div>
        ) : (
          <>
            <Link to='/login'>
              <li className='btn7'>Login</li>
            </Link>
            <Link to='/register'>
              <li className='btn7'>Signup</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
