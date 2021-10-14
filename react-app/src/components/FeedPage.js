import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
    const sessionUsersPostsArr = Object.values(sessionUsersPosts);
    const dispatch = useDispatch();
    const followedUsersPosts = useSelector(post => post.content);

    useEffect(() => {
        dispatch(getFollowedUsersPostsThunk());
    }, [dispatch])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {sessionUsersPostsArr.map((post, index) => (
                    <FeedPostCard key={index} post={post}/>
                ))}
            </div>
            <div>
                {followedUsersPosts}
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
