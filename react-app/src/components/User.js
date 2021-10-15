import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import { useModal } from '../context/Modal';
import UserPostCard from './UserPostCard';
import './User.css'

const User = () => {
  const dispatch = useDispatch();
  const { toggleModal, setModalContent } = useModal();
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

//   const openProfileModal = (e) => {
//         console.log('this is post', e);
//         setModalContent((
//             <UserPostCard postId={e.id} />
//         ));
//         toggleModal();
//    }
// onClick={openProfileModal}
  const profilePageCards = sessionUsersPostsArr.map(post => (
    <UserPostCard key={post.id} post={post} className='profile-page-cards' />
  ));

  if (!user) return null;

  return (
    <div id='profile-page-container'>
        <div id='profile-page-cards-container'>
          {profilePageCards}
        </div>
    </div>
  );
}

export default User;
