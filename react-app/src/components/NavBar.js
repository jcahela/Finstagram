import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import HomeLight from './icons/HomeLight';
import HomeDark from './icons/HomeDark';
import { useLocation, useHistory } from 'react-router';
import './NavBar.css'
import { useSelector } from 'react-redux';
import { useModal } from '../context/Modal';
import PostForm from './PostForm';

const NavBar = () => {
  const location = useLocation();
  const node = useRef();
  const [dropdown, setDropdown] = useState(false)
  const user = useSelector(state => state.session.user)
  const history = useHistory();
  const { toggleModal, setModalContent } = useModal();

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return
    }
    console.log("outside", dropdown)
    setDropdown(false);
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, []);


  function interactDropdown() {
    if (dropdown) {
      setDropdown(false)
    } else {
      setDropdown(true)
    }
  }

  function sendToProfile() {
    history.push(`/users/${user.id}`);
  }

  function openPostFormModal() {
    setModalContent((
      <PostForm />
    ))
    toggleModal();
  }

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <NavLink to='/feed' exact={true} activeClassName="active">
          <div className="finstagram-logo">Finstagram</div>
        </NavLink>
        <div className="links-container">
          <div>
            <i onClick={openPostFormModal} className="far fa-plus-square new-post-button"></i>
          </div>
          <div>
            <NavLink to='/feed' exact={true} activeClassName='active' >
              { location.pathname === '/feed' && !dropdown ? (
                <HomeDark className="home-icon"/>
                ) : (
                <HomeLight className="home-icon"/>
              ) }
            </NavLink>
          </div>
          <div>
            <NavLink to='/explore' exact={true} activeClassName='active' >
              { location.pathname === '/explore' ? (
                <i className="fas fa-compass explore-icon"></i>
                ) : (
                  <i className="far fa-compass explore-icon"></i>
                )}
            </NavLink>
          </div>
          {!user &&
            <div>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Log In
              </NavLink>
              </div>
          }
          {!user &&
            <div>
              <NavLink to='/signup' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
          }
          {user && (
            <>
            <div
              className={`profile-picture-container`}

              ref={node}
            >
              <img className={`profile-picture dropdown-${dropdown}`} src={user.profile_picture} alt="User profile avatar" onClick={interactDropdown}/>
              {dropdown &&
                <div className="profile-dropdown">
                  <div
                    className="profile-button-container"
                    onClick={() => {
                      sendToProfile()
                      setDropdown(false);
                    }}
                    >
                      <i className="far fa-user-circle profile-icon"></i>
                        Profile
                  </div>
                  <LogoutButton />
                </div>
              }
            </div>
            </>
          )}
      </div>

      </div>
    </nav>
  );
}

export default NavBar;
