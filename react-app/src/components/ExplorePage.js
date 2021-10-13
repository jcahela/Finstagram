import { useState, useEffect } from 'react';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { useDispatch, useSelector } from 'react-redux';
import './ExplorePage.css'

function ExplorePage() {
    let dispatch = useDispatch();

    let [stats, setStats] = useState(false);

    useEffect(() => {
        dispatch(getNonFollowedPostsThunk());
    }, [dispatch])

    const posts = useSelector(state => state.nonFollowedUsersPosts);
    // console.log(posts);
    // may have to use useState for explore_posts to persist between renders
    const explore_posts = {...posts}
    console.log(explore_posts);
    return (
        <>
            <div className="explore-page-container">
                {Object.keys(explore_posts).map((key) => (
                    <div className="explore-posts" onMouseEnter={() => setStats(`${key}`)} onMouseLeave={() => setStats(false)}>
                        <img src={explore_posts[key].content} alt="something" className="explore-posts" key={explore_posts[key].id}/>
                        {stats === key && <span className={`material-icons like-icon`}>favorite</span>}
                        {stats === key && <span className="likes-count">{Object.keys(explore_posts[key].likes).length}</span>}
                        {stats === key && <i className="fas fa-comment comment-icon"></i>}
                        {stats === key && <span className="comment-count">{Object.keys(explore_posts[key].comments).length}</span>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default ExplorePage
