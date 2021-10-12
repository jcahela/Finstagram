const GET_NONFOLLOWED_POSTS = 'nonFollowedPosts/GET_NONFOLLOWED_POSTS'

const getNonFollowedPosts = (posts) => ({
    type: GET_NONFOLLOWED_POSTS,
    payload: posts
})

export const getNonFollowedPostsThunk = () => async (dispatch) => {
    let response = await fetch('/api/posts/explore');

    if(response.ok) {
        const posts = await response.json();
        await dispatch(getNonFollowedPosts(posts));
        return null;
    }
}

let initialState = {}

function nonFollowedUsersPostsReducer(state = initialState, action) {
    let newState = {...state}

    switch (action.type) {
        case GET_NONFOLLOWED_POSTS:
            const posts = action.payload;
            const postsObj = {};
            posts.posts.forEach(post => postsObj[post.id] = post)
            newState = postsObj;
            return newState
        default:
            return state
    }
}

export default nonFollowedUsersPostsReducer;
