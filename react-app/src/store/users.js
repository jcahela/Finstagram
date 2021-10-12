// constants
const GET_USERS = 'users/GET_USERS';

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users
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

function usersReducer(state = initialState, action) {
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

export default usersReducer;
