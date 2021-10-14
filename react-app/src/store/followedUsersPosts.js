import { csrfFetch } from './csrf'

//$ Type
const GET_FOLLOWED_USERS_POSTS = 'followedUsersPosts/GET_FOLLOWED_USERS_POSTS';

//$ Action Creator
const getFollowedUsersPosts = (posts) => ({
    type: GET_FOLLOWED_USERS_POSTS,
    payload: posts,
})

//$ Thunk
export const getFollowedUsersPostsThunk = (userID) => async dispatch => {
    const response = await csrfFetch(`/api/posts/feed`);
    if (response.ok) {
        const posts = await response.json();
        dispatch(getFollowedUsersPosts(posts));
    }
}

//$ Reducer
const initialState = {};
const followedUsersPostsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FOLLOWED_USERS_POSTS:
            const newState = {...state};
            Object.values(action.payload).forEach(post => newState[post.id] = post);
            return {...state,...newState};
        default: return state;
    }
}

export default followedUsersPostsReducer;
