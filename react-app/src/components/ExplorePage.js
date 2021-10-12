import { useEffect } from 'react';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { useDispatch, useSelector } from 'react-redux';
import './ExplorePage.css'

function ExplorePage() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNonFollowedPostsThunk());
    }, [dispatch])

    const posts = useSelector(state => state.nonFollowedUsersPosts);
    // console.log(posts);
    // may have to use useState for explore_posts to persist between renders
    const explore_posts = {...posts}

    /*
        Object.keys(explore_posts).map((key, index) => (

        ))
    */

    return (
        <>
            <div className="explore-page-container">
                {Object.keys(explore_posts).map((key, index) => {
                        return <img src={explore_posts[key].content} alt="something" className="explore-posts"/>
                })}
            </div>
        </>
    )
}

export default ExplorePage
