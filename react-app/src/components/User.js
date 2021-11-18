import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../context/Modal';
import UserPostCard from './UserPostCard';
import './User.css'
import { getUserThunk } from '../store/users';
import ProfileFollowModal from './ProfileFollowModal';

const User = () => {
  const dispatch = useDispatch();
  const { toggleModal, setModalContent } = useModal();
  const { userId }  = useParams();
  const profileVidRef = useRef();
  const currentUser = useSelector(state => state.user);
  const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
  const sessionUser = useSelector(state => state.session.user);
  const followedUsersPosts = useSelector(state => state.followedUsersPosts);
  const nonFollowedUsersPosts = useSelector(state => state.nonFollowedUsersPosts);
  const [loaded, setLoaded] = useState(false);
  const [posts, setPosts] = useState();
  let [stats, setStats] = useState(false);


  useEffect(() => {
    dispatch(getUserThunk(userId));
  }, [dispatch, userId])

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
  }, [currentUser, followedUsersPosts, nonFollowedUsersPosts, sessionUser.followed, sessionUser.id, sessionUsersPosts, userId]);

  let profile_posts = {...posts};

  const profilePictureHandler = (e) => {

  }

  const openProfileModal = (postKey) => {
    setModalContent((
      <UserPostCard postKey={postKey} posts={profile_posts} />
    ))
    profileVidRef?.current?.pause();
    toggleModal();
  }

  const openFollowersModal = (followers) => {
    setModalContent((
      <ProfileFollowModal followList={currentUser.followers} followers={followers}/>
    ))
    toggleModal();
  }

  const openFollowingModal = () => {
    setModalContent((
      <ProfileFollowModal followList={currentUser.followed}/>
    ))
    toggleModal();
  }

  if (!loaded) {
    return null;
  }


  return (
    <>
    <div className='profile-header-container'>
        <img className='header-profile-img' src={currentUser?.profile_picture} alt='profile' />
      <div className='header-section-1' onClick={profilePictureHandler}>
        <div className='header-section-1a'></div>
        <span className='header-username'>{currentUser?.username}</span>
      </div>
      <div className='header-section-2'>
        <div className='header-section-2a'>
          <span className='header-posts default-cursor'><span className='bold'>{Object.values(posts)?.length}</span> posts</span>
          <span className='header-followers pointer-cursor' onClick={() => openFollowersModal(true)}><span className='bold'>{currentUser?.followers ? Object.values(currentUser.followers).length : 0}</span> followers</span>
          <span className='header-following pointer-cursor' onClick={openFollowingModal}><span className='bold'>{currentUser?.followers ? Object.values(currentUser.followed).length : 0}</span> following</span>
        </div>
      </div>
      <div className='header-name'>{currentUser?.firstname} {currentUser?.lastname}</div>
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
                <video ref={profileVidRef} src={profile_posts[key].content} onClick={() => openProfileModal(key)} alt="something" className="profile-posts video-post" key={profile_posts[key].id} autoPlay muted></video>
              ):(
                <img src={profile_posts[key].content} onClick={() => openProfileModal(key)} alt="something" className="profile-posts" key={profile_posts[key].id} />
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
