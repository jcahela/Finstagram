import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSessionUsersPostsThunk } from '../store/sessionUserPosts';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';
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
  const sessionUser = useSelector(state => state.session.user);
  const allUsers = useSelector(state => state.users);
  const followedUsersPosts = useSelector(state => state.followedUsersPosts);
  const nonFollowedUsersPosts = useSelector(state => state.nonFollowedUsersPosts);

  let posts = [];

  useEffect(() => {
    (async () => {
      if (sessionUser.id === userId) {
        await dispatch(getSessionUsersPostsThunk());
        posts = sessionUsersPosts;
      } else if (Object.keys(sessionUser.followed)) {
        await dispatch(getFollowedUsersPostsThunk());
        posts = followedUsersPosts.filter(post => (
          post.user_id === userId
        ))
      } else {
        await dispatch(getNonFollowedPostsThunk());
        posts = nonFollowedUsersPosts.filter(post => (
          post.user_id === userId
        ))
      }
    })();
  }, [dispatch, sessionUser.id, userId]);

  // useEffect(() => {
  //   dispatch(getSessionUsersPostsThunk());
  // }, [dispatch])

//   const openProfileModal = (e) => {
//         console.log('this is post', e);
//         setModalContent((
//             <UserPostCard postId={e.id} />
//         ));
//         toggleModal();
//    }
// onClick={openProfileModal}

  function openExplorePostModal(postKey) {
    setModalContent((
      <UserPostCard postKey={postKey} posts={posts}/>
    ))
    toggleModal();
  }

  if (!user) return null;

  return (
    <div className="explore-page-container">
      {/* {Object.keys(explore_posts).map((key) => (
          <div className="explore-posts" onMouseOver={() => setStats(`${key}`)} onMouseLeave={() => setStats(false)}>
              <img src={explore_posts[key].content} onClick={() => openExplorePostModal(key)} alt="something" className="explore-posts" key={explore_posts[key].id}/>
              {stats === key && <span className={`material-icons like-icon`}>favorite</span>}
              {stats === key && <span className="likes-count">{Object.keys(explore_posts[key].likes).length}</span>}
              {stats === key && <i className="fas fa-comment comment-icon"></i>}
              {stats === key && <span className="comment-count">{Object.keys(explore_posts[key].comments).length}</span>}
          </div>
      ))} */}
    </div>
  );
}

export default User;
