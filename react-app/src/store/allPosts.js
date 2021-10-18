const GET_ALL_POSTS = 'allPosts/GET_ALL_POSTS'
const ADD_LIKE = 'allPosts/ADD_LIKE'
const REMOVE_LIKE = 'allPosts/REMOVE_LIKE'

const getPosts = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts
})

export const addLike = (user) => ({
    type: ADD_LIKE,
    payload: user
})

export const removeLike = (likeInfo) => ({
    type: REMOVE_LIKE,
    payload: likeInfo
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
        case ADD_LIKE:
            const { post_id, id, email, firstname, lastname, username, profile_picture } = action.payload
            const likedUser = {
                email, firstname, lastname, username, id, profile_picture
            }
            newState[post_id].likes[id] = likedUser
            return newState
        case REMOVE_LIKE:
            const {removePostId, removeUserId} = action.payload
            const postLikes = newState[removePostId].likes
            delete postLikes[removeUserId]
            return newState
        default:
            return state;
    }
} 
