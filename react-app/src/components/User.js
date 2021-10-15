import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import FeedPostCard from './FeedPostCard';
import './User.css'

const User = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
  const sessionUsersPostsArr = Object.values(sessionUsersPosts);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(getSessionUsersPostsThunk());
  }, [dispatch])

  const profilePageCards = sessionUsersPostsArr.map(post => (
    <FeedPostCard key={post.id} post={post} />
  ));

  if (!user) return null;

  return (
    <div id='profile-page-container'>
        <div id='profile-page-cards'>
          {profilePageCards}
        </div>
    </div>
  );
}

export default User;
