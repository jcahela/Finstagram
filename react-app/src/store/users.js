// constants
const GET_USERS = 'users/GET_USERS';
const GET_USER = 'users/GET_USER';

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
})

const getUser = (user) => ({
    type: GET_USER,
    payload: user
})

const initialState = { };

export const getUsersThunk = () => async (dispatch) => {
    const response = await fetch('/api/users/')

    if (response.ok) {
        const users = await response.json();
        await dispatch(getUsers(users));
        return null
    }
}

export const getUserThunk = (userID) => async (dispatch) => {
    const response = await fetch(`/api/users/${userID}`);

    if (response.ok) {
        const user = await response.json();
        await dispatch(getUser(user));
        return null;
    }
}

export function usersReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_USERS:
            const users = action.payload;
            const usersObj = {};
            users.users.forEach(user => usersObj[user.id] = user)
            newState = usersObj;
            return newState
        default:
            return state
    }
}

export function userReducer(state = initialState, action) {
    let newState = {...state}
    switch (action.type) {
        case GET_USER:
            const user = action.payload;
            const userObj = {...user};
            newState = userObj;
            return newState;
        default:
            return state
    }
}
