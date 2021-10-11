// constants

const GET_SESSION_USER_POSTS = 'users/GET_SESSION_USER_POSTS'

const getSessionUsersPosts = (posts) => ({
    type: GET_SESSION_USER_POSTS,
    payload: posts
})

const initialState = { };

// export const getSessionUsersPostsThunk = (user) => async (dispatch) => {

// }
