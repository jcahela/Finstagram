import { useState, useEffect, useRef } from 'react';
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
  const profileVidRef = useRef();
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

  let profile_posts = {...posts};

  function openProfilePostModal(postKey) {
    setModalContent((
      <UserPostCard profileVidRef={profileVidRef} postKey={postKey} posts={profile_posts} />
    ))
    profileVidRef?.current?.pause();
    toggleModal();
  }

  if (!loaded) {
    return null;
  }

  return (
    <>
    <div className='profile-header-container'>
      <div className='header-section-1'>
        <div className='header-profile-div'><img className='header-profile-img' src={sessionUser.profile_picture} alt='profile' /></div>
        <div className='header-username'>{sessionUser.username}</div>
      </div>
        <div className='header-name'>{sessionUser.firstname} {sessionUser.lastname}</div>
      <div className='header-section-3'>
        <div className='header-posts'>{Object.values(sessionUsersPosts).length} <span>posts</span></div>
        <div className='header-followers'>{Object.values(sessionUser.followers).length} <span>followers</span></div>
        <div className='header-following'>{Object.values(sessionUser.followed).length} <span>following</span></div>
      </div>
    </div>
    <div className="profile-posts-container">
      {Object.keys(profile_posts).map((key) => {
        const isVideo =
        profile_posts[key]?.content?.slice(-3) === 'mp4' ||
        profile_posts[key]?.content?.slice(-3) === 'mov' ||
        profile_posts[key]?.content?.slice(-3) === 'wmv' ||
        profile_posts[key]?.content?.slice(-3) === 'avi' ||
        profile_posts[key]?.content?.slice(-4) === 'webm' ||
        profile_posts[key]?.content?.slice(-5) === 'html5';

        return (
          <div className="profile-posts" onMouseOver={() => setStats(`${key}`)} onMouseLeave={() => setStats(false)}>
              { isVideo ? (
                <video ref={profileVidRef} src={profile_posts[key].content} onClick={() => openProfilePostModal(key)} alt="something" className="profile-posts video-post" key={profile_posts[key].id} autoPlay muted></video>
              ):(
                <img src={profile_posts[key].content} onClick={() => openProfilePostModal(key)} alt="something" className="profile-posts" key={profile_posts[key].id}/>
              )}
              {stats === key && <span className={`material-icons like-icon`}>favorite</span>}
              {stats === key && <span className="likes-count">{Object.keys(profile_posts[key].likes).length}</span>}
              {stats === key && <i className="fas fa-comment comment-icon"></i>}
              {stats === key && <span className="comment-count">{Object.keys(profile_posts[key].comments).length}</span>}
          </div>
        )
      })}
    </div>
    </>
  )
}

export default User;
