import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ExplorePage from './components/ExplorePage';
import FeedPage from './components/FeedPage';
import { authenticate } from './store/session';
import { getUsersThunk } from './store/users';
import { getSessionUsersPostsThunk } from './store/sessionUserPosts';
import { getFollowedUsersPostsThunk } from './store/followedUsersPosts';
import { getNonFollowedPostsThunk } from './store/nonFollowedUsersPosts';
import { getAllPostsThunk } from './store/allPosts';
import { useModal } from './context/Modal';
import ScrollToTop from './components/ScrollToTop';

import Modal from './components/Modal';
import ContactPage from './components/ContactPage';

function App() {
  const { closeModal } = useModal();
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentSessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getUsersThunk());
      await dispatch(getAllPostsThunk());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    (async() => {
      if (currentSessionUser) await dispatch(getSessionUsersPostsThunk());
      if (currentSessionUser) await dispatch(getFollowedUsersPostsThunk());
      if (currentSessionUser) await dispatch(getNonFollowedPostsThunk());
    })();
  }, [dispatch, currentSessionUser]);

  useEffect(() => {
    (() => {
      window.onpopstate = () => {
        closeModal();
      };
    })()
  })

  if (!loaded) {
    return (
      <div className="loading-container">
        <img className="loading-gif"src="https://i.stack.imgur.com/MEBIB.gif" alt="" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}></Modal>
      <Switch>
        <Route path='/' exact={true}>
          <Redirect to="/login" />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <NavBar setIsOpen={setIsOpen} isOpen={isOpen}/>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar setIsOpen={setIsOpen} isOpen={isOpen}/>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/feed' exact={true} >
          <NavBar setIsOpen={setIsOpen} isOpen={isOpen}/>
          <FeedPage />
        </ProtectedRoute>
        <ProtectedRoute path='/explore' exact={true} >
          <NavBar setIsOpen={setIsOpen} isOpen={isOpen}/>
          <ExplorePage />
        </ProtectedRoute>
        <Route path='/contact' exact={true}>
          <ContactPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
