import { getUsers, fetchFromUrl } from '../../api/github';
import { IGitHubUserGist, IUserResponse } from '../../types/redux/IAppState';

enum ApplicationStateActionsEnum {
    selectUser = 'APPLY_USER_FILTER',
    fetchUsers = 'FETCH_USERS',
    fetchUserGists = 'FETCH_USER_GISTS',
};

const setSelectedUser = (user: IUserResponse) => {
    return {
        type: ApplicationStateActionsEnum.selectUser,
        payload: user,
    };
};

const fetchUsers = (userFilter?: string) => async (dispatch: any, getState: Function) => { 
    let data = { ...getState().users, loadingUsers: true };

    dispatch({
        type: ApplicationStateActionsEnum.fetchUsers,
        payload: data,
    });  

    try {
        data = await getUsers(userFilter);
    } catch (err) {
        console.warn(err);
    }

    dispatch({
        type: ApplicationStateActionsEnum.fetchUsers,
        payload: {...data, loadingUsers: false },
    });
};

const fetchUserGists = (gistUrl: string) => async (dispatch: any, getState: Function) => {     
    let data = { ...getState().gists, loadingUserGists: true };
    const _gistURL = gistUrl.split('{')[0];

    dispatch({
        type: ApplicationStateActionsEnum.fetchUserGists,
        payload: data,
    });

    try {
        const gists = await fetchFromUrl<IGitHubUserGist>(_gistURL);
        data = { items: gists, loadingUserGists: false};
    } catch (err) {
        console.warn(err);
    }

    dispatch({
        type: ApplicationStateActionsEnum.fetchUserGists,
        payload: data,
    });
};

export {
    setSelectedUser,
    fetchUsers,
    fetchUserGists,
    ApplicationStateActionsEnum
};