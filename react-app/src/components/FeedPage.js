import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const dispatch = useDispatch();
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
