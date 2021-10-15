import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const dispatch = useDispatch();
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
    const followedUsersPosts = useSelector(state => state.followedUsersPosts);
    const feedPosts = [...Object.values(sessionUsersPosts), ...Object.values(followedUsersPosts)];
    const feedPostsOrdered = feedPosts.sort((a, b) => (a.id < b.id ? 1: -1))

    feedPosts.forEach(post => console.log(post.created_at))

    useEffect(() => {
        dispatch(getFollowedUsersPostsThunk());
    }, [dispatch])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {feedPostsOrdered.map((post) => (
                    <FeedPostCard key={post.id} post={post}/>
                ))}
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
