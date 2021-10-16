import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';
import { useHistory } from 'react-router-dom';

function FeedPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const feedPostsOrdered = useSelector(state => {
        const sessionUsersPosts = state.sessionUsersPosts;
        const followedUsersPosts = state.followedUsersPosts;
        const feedPostsObj = {
            ...sessionUsersPosts,
            ...followedUsersPosts
        }
        const feedPosts = Object.values(feedPostsObj);
        const postsOrdered = feedPosts.sort((a, b) => (a.id < b.id ? 1: -1))
        return postsOrdered
    });
    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(getFollowedUsersPostsThunk());
    }, [dispatch])

    const sendToProfile = () => {
        history.push(`/users/${sessionUser.id}`)
    }

    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {feedPostsOrdered.map((post) => (
                    <FeedPostCard key={post.id} postId={post.id}/>
                ))}
            </div>
            <div className="profile-container">
                <img onClick={sendToProfile} className="feed-profile-picture" src={sessionUser.profile_picture} alt="" />
                <div className="feed-profile-info-container">
                    <p onClick={sendToProfile} className="feed-profile-username">{sessionUser.username}</p>
                    <p className="feed-profile-firstlastname">{sessionUser.firstname} {sessionUser.lastname}</p>
                </div>
            </div>
        </div>
    )
}

export default FeedPage
