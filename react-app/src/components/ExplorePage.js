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

    function test(){
        console.log("This works")
    }

    return (
        <>
            <div className="explore-page-container">
                {Object.keys(explore_posts).map((key, index) => (
                        <img src={explore_posts[key].content} onClick={test} alt="something" className="explore-posts" key={explore_posts[key].id}/>
                ))}
            </div>
        </>
    )
}

export default ExplorePage
