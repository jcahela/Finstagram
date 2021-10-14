import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const dispatch = useDispatch();
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
    const sessionUsersPostsArr = Object.values(sessionUsersPosts);

    useEffect(() => {
        dispatch(getFollowedUsersPostsThunk());
    }, [dispatch])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {sessionUsersPostsArr.map((post) => (
                    <FeedPostCard key={post.id} post={post}/>
                ))}
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
