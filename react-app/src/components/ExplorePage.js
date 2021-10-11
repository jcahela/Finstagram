import { useEffect, useState } from 'react';
import { getNonFollowedPostsThunk } from '../store/nonFollowedUsersPosts';
import { useDispatch, useSelector } from 'react-redux';

function ExplorePage() {
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNonFollowedPostsThunk());
    }, [dispatch])

    const posts = useSelector(state => state.nonFollowedUsersPosts);
    // console.log(posts);

    return (
        <>
            {Object.keys(posts).map(key => (
                <ul>
                    <li>User Id: {posts[key].user_id}</li>
                    <li>Description: {posts[key].description}</li>
                    <li>Content: {posts[key].content}</li>
                </ul>
            ))}
        </>
    )
}

export default ExplorePage
