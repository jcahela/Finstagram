
// constants
const GET_SESSION_USER_POSTS = 'users/GET_SESSION_USER_POSTS'
const REMOVE_SESSION_USER_POSTS = 'users/REMOVE_SESSION_USER_POSTS'

const getSessionUsersPosts = (posts) => ({
    type: GET_SESSION_USER_POSTS,
    payload: posts
})

export const removeSessionUsersPosts = () => ({
    type: REMOVE_SESSION_USER_POSTS
})

const initialState = { };

export const getSessionUsersPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/')

    if (response.ok) {
        const posts = await response.json();
        await dispatch(getSessionUsersPosts(posts))
        return null
    }
}

function sessionUserPostsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_SESSION_USER_POSTS:
            const posts = action.payload;
            const postsObj = {};
            posts.posts.forEach(post => postsObj[post.id] = post)
            newState = postsObj;
            return newState
        case REMOVE_SESSION_USER_POSTS:
            newState = {};
            return newState
        default:
            return state
    }
}

export default sessionUserPostsReducer
