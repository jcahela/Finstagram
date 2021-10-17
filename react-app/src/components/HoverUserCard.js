import { useSelector } from 'react-redux'
import { unfollowUserThunk, followUserThunk } from '../store/sessionUserPosts'
import { authenticate } from '../store/session'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './HoverUserCard.css'

function HoverUserCard({ isFollowing, setIsFollowing, followRef, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUserPosts = useSelector(state => state.sessionUsersPosts)
    const followedUsersPosts = useSelector(state => state.followedUsersPosts)
    const nonFollowedUsersPosts = useSelector(state => state.nonFollowedUsersPosts)
    const sessionUser = useSelector(state => state.session.user)
    const followedUsers = sessionUser.followed;

    const allPostsObj = {
        ...sessionUserPosts,
        ...followedUsersPosts,
        ...nonFollowedUsersPosts
    }

    const allPostsArr = Object.values(allPostsObj)

    const usersPosts = allPostsArr.filter(post => post.user_id === user.id)
    const usersFollowers = Object.values(user.followers)
    const usersFollowed = Object.values(user.followed)
    const usersThreePosts = usersPosts.slice(0, 3)

    const unfollowUser = async (userId) => {
        await dispatch(unfollowUserThunk(userId))
        await dispatch(authenticate())
        followRef.current.innerText = 'Follow'
        setIsFollowing(false)
    }

    const followUser = async (userId) => {
        await dispatch(followUserThunk(userId))
        await dispatch(authenticate())
        setIsFollowing(true)
    }

    const sendToProfile = () => {
        history.push(`/users/${user.id}`)
    }

    return (
        <div className="hover-user-card-container">
            <div className="hover-user-card-header">
                <img onClick={sendToProfile} className="hover-user-card-profile-pic" src={user.profile_picture} alt="" />
                <div className="hover-user-card-header-info">
                    <p onClick={sendToProfile} className="hover-user-card-username">{user.username}</p>
                    <p className="hover-user-card-fullname">{user.firstname} {user.lastname}</p>
                </div>
            </div>
            <div className="hover-user-card-stats">
                <div className="hover-user-card-posts-container">
                    <p className="hover-user-card-posts-amount">{usersPosts.length}</p>
                    <p  className="hover-user-card-posts-label">posts</p>
                </div>
                <div className="hover-user-card-followers-container">
                    <p className="hover-user-card-followers-amount">{usersFollowers.length}</p>
                    <p  className="hover-user-card-followers-label">followers</p>
                </div>
                <div className="hover-user-card-followed-container">
                    <p className="hover-user-card-followed-amount">{usersFollowed.length}</p>
                    <p  className="hover-user-card-followed-label">following</p>
                </div>
            </div>
            <div className="hover-user-card-three-posts">
                {usersThreePosts.map((post, index) => {
                    const isVideo = 
                        post?.content?.slice(-3) === 'mp4' ||
                        post?.content?.slice(-3) === 'mov' ||
                        post?.content?.slice(-3) === 'wmv' ||
                        post?.content?.slice(-3) === 'avi' ||
                        post?.content?.slice(-4) === 'webm' ||
                        post?.content?.slice(-5) === 'html5'

                        return (
                            <div className={`hover-user-card-post-image-div hover-card-image-${index+1}`}>
                                { isVideo ? (
                                    <video className="hover-user-card-post-image video-card" src={usersThreePosts[index]?.content} alt="" autoPlay muted/>
                                ):(
                                    <img className="hover-user-card-post-image" src={usersThreePosts[index]?.content} alt="" />
                                )}
                            </div>
                        )
                })}
            </div>
            { user.id !== sessionUser.id ? (
                isFollowing || user.id in followedUsers ? (
                    <span onClick={() => unfollowUser(user.id)} className="hover-user-card-following-button">Following</span>
                ):(
                    <span onClick={() => followUser(user.id)} className="hover-user-card-follow-button">Follow</span>
                    )

                ):(
                    <span className="hover-user-card-follow-blank"></span>
                )}
        </div>
    )
}

export default HoverUserCard
