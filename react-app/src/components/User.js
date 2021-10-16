import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../context/Modal';
import UserPostCard from './UserPostCard';
import './User.css'

const User = () => {
  const { toggleModal, setModalContent } = useModal();
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState();
  let [stats, setStats] = useState(false);
  const { userId }  = useParams();
  const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
  const sessionUser = useSelector(state => state.session.user);
  const followedUsersPosts = useSelector(state => state.followedUsersPosts);
  const nonFollowedUsersPosts = useSelector(state => state.nonFollowedUsersPosts);

  useEffect(() => {
    (async () => {
      if (sessionUser.id === +userId) {
        setPosts(sessionUsersPosts);
        setLoaded(true);
      } else if (Object.keys(sessionUser.followed).includes(userId)) {
          let followedPostsArr = Object.values(followedUsersPosts).filter(post => (
            post.user_id === +userId
          ))
        let followedPosts = {}
        followedPostsArr.forEach(post => (
          followedPosts[post.id] = post
        ))
        setPosts(followedPosts);
        setLoaded(true);
      } else {
        let nonFollowedPostsArr = Object.values(nonFollowedUsersPosts).filter(post => (
          post.user_id === +userId
        ))
        let nonFollowedPosts = {};
        nonFollowedPostsArr.forEach(post => (
          nonFollowedPosts[post.id] = post
        ))
        setPosts(nonFollowedPosts);
        setLoaded(true);
      }
    })();
}, [followedUsersPosts, nonFollowedUsersPosts, sessionUser.followed, sessionUser.id, sessionUsersPosts, userId]);

  let profile_posts = {...posts}

  function openProfilePostModal(postKey) {
    setModalContent((
      <UserPostCard postKey={postKey} posts={profile_posts} />
    ))
    toggleModal();
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div id='profile-header-container'>
        <div>{sessionUser.username}</div>
        <div>{Object.values(sessionUsersPosts).length} <span>posts</span></div>
        <div>{Object.values(sessionUser.followers).length} <span>followers</span></div>
        <div>{Object.values(sessionUser.followed).length} <span>following</span></div>
        <div>{sessionUser.firstname} {sessionUser.lastname}</div>
      </div>
      <div className="profile-posts-container">
        {Object.keys(profile_posts).map((key) => (
            <div className="profile-posts" onMouseOver={() => setStats(`${key}`)} onMouseLeave={() => setStats(false)}>
                <img src={profile_posts[key].content} onClick={() => openProfilePostModal(key)} alt="something" className="profile-posts" key={profile_posts[key].id}/>
                {stats === key && <span className={`material-icons like-icon`}>favorite</span>}
                {stats === key && <span className="likes-count">{Object.keys(profile_posts[key].likes).length}</span>}
                {stats === key && <i className="fas fa-comment comment-icon"></i>}
                {stats === key && <span className="comment-count">{Object.keys(profile_posts[key].comments).length}</span>}
            </div>
        ))}
      </div>
    </>
  );
}

export default User;
