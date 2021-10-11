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

  return <button className="logout-comp" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
