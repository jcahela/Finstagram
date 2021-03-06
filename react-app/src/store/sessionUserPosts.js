import { removeFollowedUser } from "./session"
import { addLike, removeLike } from "./allPosts"

// constants
const GET_SESSION_USER_POSTS = 'sessionUsersPosts/GET_SESSION_USER_POSTS'
const REMOVE_SESSION_USER_POSTS = 'sessionUsersPosts/REMOVE_SESSION_USER_POSTS'
const ADD_NEW_POST = 'sessionUsersPosts/ADD_NEW_POST'
const REMOVE_POST = 'sessionUsersPosts/REMOVE_POST'
const EDIT_POST = 'sessionUsersPosts/EDIT_POST'

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

const editPost = (post) => ({
    type: EDIT_POST,
    payload: post
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
        const data = await response.json();
        dispatch(addNewPost(data))
        return null;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
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
    const { post_id, id, email, firstname, lastname, username, profile_picture } = like
    const user = {
        post_id, id, email, firstname, lastname, username, profile_picture
    }
    const response = await fetch(`/api/posts/${post_id}/likes`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            post_id
        })
    })

    dispatch(addLike(user))

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
    const { post_id, user_id } = likeToRemove;
    const likeInfo = {
        'removePostId': post_id,
        'removeUserId': user_id
    }

    const response = await fetch(`/api/posts/${post_id}/likes`, {
        method: 'DELETE'
    })

    dispatch(removeLike(likeInfo))

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

export const removeCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
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

export const editCommentThunk = (comment) => async (dispatch) => {
    const { id, description, post_id } = comment;
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id,
            description,
            post_id
        })
    })

    if (response.ok) {
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const followUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/follow/${userId}`, {
        method: 'POST'
    })
    if (response.ok) {
        const data = await response.json()
        return data;
    }
}

export const unfollowUserThunk = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/follow/${userId}`, {
        method: 'DELETE'
    })
    await dispatch(removeFollowedUser(userId))
    
    if (response.ok) {
        const data = await response.json()
        return data;
    }
}

export const editPostThunk = (post) => async (dispatch) => {
    const { id, description } = post;
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            description: description
        })
    })

    if (response.ok) {
        const data = await response.json();
        await dispatch(editPost(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
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
        case EDIT_POST:
            const editedPost = action.payload.post
            const editedPostId = editedPost.id
            newState[editedPostId] = editedPost
            return newState
        default:
            return state
    }
}



export default sessionUserPostsReducer
