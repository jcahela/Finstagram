import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import HomeLight from './icons/HomeLight';
import HomeDark from './icons/HomeDark';
import { useLocation } from 'react-router';
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const location = useLocation();
  const user = useSelector(state => state.session.user)
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <NavLink to='/feed' exact={true} activeClassName="active">
          <div className="finstagram-logo">Finstagram</div>
        </NavLink>
        <div className="links-container">
          <div>
            <NavLink to='/feed' exact={true} activeClassName='active'>
              { location.pathname === '/feed' ? (
                <HomeDark className="home-icon"/>
                ) : (
                <HomeLight className="home-icon"/>
              ) }
            </NavLink>
          </div>
          <div>
            <NavLink to='/explore' exact={true} activeClassName='active'>
              { location.pathname === '/explore' ? (
                <i class="fas fa-compass explore-icon"></i>
                ) : (
                  <i className="far fa-compass explore-icon"></i>
                )}
            </NavLink>
          </div>
          {!user &&
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
              </div>
          }
          {!user && 
            <div>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          }
          <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
          {user && 
            <div>
              <LogoutButton />
            </div>
          }

      </div>

      </div>
    </nav>
  );
}

export default NavBar;
