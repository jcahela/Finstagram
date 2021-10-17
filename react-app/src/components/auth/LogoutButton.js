import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { removeSessionUsersPosts } from '../../store/sessionUserPosts';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(removeSessionUsersPosts());
  };

  return (
      <div className="logout-button-container" onClick={onLogout}>
        <i class="fas fa-sign-out-alt"></i>
        <button className="logout-comp">Logout</button>
      </div>
    )
};

export default LogoutButton;
