import FeedPostCard from './FeedPostCard';
import './FeedPage.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFollowedUsersPostsThunk } from '../store/followedUsersPosts';


function FeedPage() {
    const dispatch = useDispatch();
    const sessionUsersPosts = useSelector(state => state.sessionUsersPosts);
    const sessionUsersPostsArr = Object.values(sessionUsersPosts);
    // const followedUsersPosts = useSelector(state => state.followedUsersPosts);
    // const followedUsersPostsArr = Object.values(followedUsersPosts);

    useEffect(() => {
        dispatch(getFollowedUsersPostsThunk());
    }, [dispatch])

    return (
        <div className="feed-page-container">
            <div className="feed-container">
                {/* {followedUsersPostsArr.map((post) => (
                    <FeedPostCard key={post.id} post={post} />
                ))} */}
                {sessionUsersPostsArr.map((post, index) => (
                    <FeedPostCard key={index} post={post}/>
                ))}
            </div>
            <div>
                {/* {followedUsersPosts} */}
            </div>
            <div className="profile-container"></div>
        </div>
    )
}

export default FeedPage
