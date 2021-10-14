import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts)
    const sessionUsersPostsArr = Object.values(sessionUsersPosts)
    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {sessionUsersPostsArr.map((post, index) => (
                    <FeedPostCard key={index} post={post}/>
                ))}
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
