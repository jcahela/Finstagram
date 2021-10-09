import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getUsersThunk } from '../../store/users';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
  })
  
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/login' />}
    </Route>
  )
};


export default ProtectedRoute;
