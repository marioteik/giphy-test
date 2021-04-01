import { fetchSearchGif } from '../../api/giphy';
import { ApplicationStateActionsEnum } from '../types';
import {IGif, IPagination} from "../types/IAppState";
import IReduxAction from "../types/IAction";
// import { IGitHubUserGist, IUserResponse } from '../../types/redux/IAppState';

const toggleBookmark = (gif: IReduxAction<IGif>) => {
    return {
        type: ApplicationStateActionsEnum.toggleBookmark,
        payload: gif,
    };
};

const fetchGifs = (userFilter = '', pagination?: IPagination) => async (dispatch: any, getState: Function) => {
    const _gifs = getState().gifs;
    let tempData = { ..._gifs, data: pagination ? _gifs.data : [], loadingGifs: userFilter === '' ? false : true };

    dispatch({
        type: ApplicationStateActionsEnum.searchGifs,
        payload: tempData,
    });

    if (userFilter.length > 0) {
        try {
            let resp = await fetchSearchGif({
                name: userFilter || '',
                pagination,
            });

            if (pagination) {
                resp = {
                    ...resp,
                    data: [...tempData.data, ...resp.data],
                }
            }

            dispatch({
                type: ApplicationStateActionsEnum.searchGifs,
                payload: {...resp, loadingGifs: false},
            });
        } catch (err) {
            console.warn(err);
        }
    }
};

const setSearchFilter = (filter: string) => {
    return {
        type: ApplicationStateActionsEnum.searchFilter,
        payload: filter,
    };
}

export {
    ApplicationStateActionsEnum,
    fetchGifs,
    toggleBookmark,
    setSearchFilter,
};