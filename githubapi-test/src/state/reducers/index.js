import { combineReducers } from "redux";
import { ApplicationStateActionsEnum } from "../actions";

const initialUserState = { items: [], loadingUsers: false };
const initialUserGists = { items: [], loadingUserGists: false };

const usersReducer = (users = initialUserState, action) => {
    if (action.type === ApplicationStateActionsEnum.fetchUsers) {
        return action.payload;
    }

    return users;
};

const selectedUserReducer = (selectedUser = null, action) => {
    if (action.type === ApplicationStateActionsEnum.selectUser) {
        return action.payload;
    }
    
    return selectedUser;
};

const userGistReducer = (userGists = initialUserGists, action) => {
    if (action.type === ApplicationStateActionsEnum.fetchUserGists) {
        return action.payload;
    }
    
    return userGists;
};

export default combineReducers({
    users: usersReducer,
    selectedUser: selectedUserReducer,
    gists: userGistReducer,
});