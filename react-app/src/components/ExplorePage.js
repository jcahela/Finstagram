import { useEffect, useState } from 'react';
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

    return (
        <>
            <div className="explore-page-container">
                {Object.keys(explore_posts).map((key) => (
                    <div className="explore-posts" onMouseEnter={() => setStats(`${key}`)} onMouseLeave={() => setStats(false)}>
                        <img src={explore_posts[key].content} alt="something" className="explore-posts" key={explore_posts[key].id}/>
                        {stats === key && <span className={`material-icons like-icon`}>favorite</span>}
                    </div>
                ))}
            </div>
        </>
    )
}

export default ExplorePage
