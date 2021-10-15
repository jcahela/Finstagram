
// constants
const GET_SESSION_USER_POSTS = 'sessionUsersPosts/GET_SESSION_USER_POSTS'
const REMOVE_SESSION_USER_POSTS = 'sessionUsersPosts/REMOVE_SESSION_USER_POSTS'
const ADD_NEW_POST = 'sessionUsersPosts/ADD_NEW_POST'
const REMOVE_POST = 'sessionUsersPosts/REMOVE_POST'

const getSessionUsersPosts = (posts) => ({
    type: GET_SESSION_USER_POSTS,
    payload: posts
})

export const removeSessionUsersPosts = () => ({
    type: REMOVE_SESSION_USER_POSTS
})

const addNewPost = (post) => ({
    type: ADD_NEW_POST,
    payload: post
})

const removePost = (postId) => ({
    type: REMOVE_POST,
    payload: postId
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

export const addNewPostThunk = (formData) => async (dispatch) => {
    const response = await fetch('/api/posts/', {
        method: 'POST',
        body: formData
    })
    if (response.ok) {
        const newPost = await response.json();
        await dispatch(addNewPost(newPost))
        return null
    }
}

export const addCommentThunk = (comment) => async (dispatch) => {
    const { description, post_id } = comment;
    const response = await fetch(`/api/posts/${comment.post_id}/comments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            description, 
            post_id
        })
    })

    if (response.ok) {
        return null
    } else {
        if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        }
    }
}

export const addLikeThunk = (like) => async (dispatch) => {
    const { post_id } = like;

    const response = await fetch(`/api/posts/${post_id}/likes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            post_id
        })
    })

    if (response.ok) {
        return null
    } else {
        if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        }
    }
}

export const removeLikeThunk = (likeToRemove) => async (dispatch) => {
    const { post_id } = likeToRemove;

    const response = await fetch(`/api/posts/${post_id}/likes`, {
        method: 'DELETE'
    })
    
    if (response.ok) {
        return null
    } else {
        if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
                return data.errors;
            }
        }
    }
}

export const removePostThunk = (postId) => async (dispatch) => {
    await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    })

    await dispatch(removePost(postId))
}

function sessionUserPostsReducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case GET_SESSION_USER_POSTS:
            const posts = action.payload;
            const postsObj = {};
            posts.posts.forEach(post => postsObj[post.id] = post)
            newState = postsObj;
            return newState;
        case REMOVE_SESSION_USER_POSTS:
            newState = {};
            return newState;
        case ADD_NEW_POST:
            const post = action.payload;
            newState[post.id] = post;
            return newState;
        case REMOVE_POST:
            const postId = action.payload;
            delete newState[postId]
            return newState;
        default:
            return state
    }
}



export default sessionUserPostsReducer
