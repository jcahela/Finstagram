const GET_ALL_POSTS = 'allPosts/GET_ALL_POSTS'

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
})

export const getAllPostsThunk = () => async (dispatch) => {
    const response = await fetch('/api/posts/all')

    if (response.ok) {
        const data = await response.json();
        await dispatch(getPosts(data))
    }
}

const initialState = {}

export default function allPostsReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_ALL_POSTS:
            const posts = action.payload.posts
            const postsObj = {};
            posts.forEach(post => postsObj[post.id] = post)
            newState = postsObj;
            return newState;
        default:
            return state;
    }
} 
