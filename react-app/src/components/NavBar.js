import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import HomeLight from './icons/HomeLight';
import HomeDark from './icons/HomeDark';
import { useLocation } from 'react-router';
import './NavBar.css'

const NavBar = () => {
  const location = useLocation();
  return (
    <nav className="nav-container">
      <ul>
        <li>
          <NavLink to='/feed' exact={true} activeClassName='active'>
            { location.pathname === '/feed' ? (
              <HomeDark className="home-icon"/>
              ) : (
              <HomeLight className="home-icon"/>
            ) }
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            { location.pathname === '/users' ? (
              <i class="fas fa-compass explore-icon"></i>
              ) : (
                <i className="far fa-compass explore-icon"></i>
              )}
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
