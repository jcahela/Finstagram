import { csrfFetch } from './csrf'

//$ Type
const GET_FOLLOWED_USERS_POSTS = 'followedUsersPosts/GET_FOLLOWED_USERS_POSTS';

//$ Action Creator
const getFollowedUsersPosts = (posts) => ({
    type: GET_FOLLOWED_USERS_POSTS,
    payload: posts,
})

//$ Thunk
export const getFollowedUsersPostsThunk = () => async dispatch => {
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
            const posts = action.payload.followed_users_posts
            console.log(action.payload);
            const newState = {...state};
            Object.values(posts).forEach(post => newState[post.id] = post);
            return newState;
        default: return state;
    }
}

export default followedUsersPostsReducer;
