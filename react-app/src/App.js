import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ExplorePage from './components/ExplorePage';
import { authenticate } from './store/session';
import { getUsersThunk } from './store/users';
import { getSessionUsersPostsThunk } from './store/sessionUserPosts'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentSessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getUsersThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      if (currentSessionUser) await dispatch(getSessionUsersPostsThunk());
    })();
  }, [dispatch, currentSessionUser]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/feed' exact={true} >
          <h1>My Feed</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/explore' exact={true} >
          <h1>My Explore Page</h1>
          <ExplorePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
