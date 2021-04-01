import {combineReducers} from "redux";
import {ApplicationStateActionsEnum} from "../types";

const initialGifs = {
    data: [],
    loadingGifs: false
};

const gifsReducer = (gifs = initialGifs, action) => {
    if (action.type === ApplicationStateActionsEnum.searchGifs) {
        return action.payload;
    }

    return gifs;
};

const toggleGifsReducer = (gifs = [], action) => {
    if (action.type === ApplicationStateActionsEnum.toggleBookmark) {
        let _gifs = [...gifs];
        const gifIndex = _gifs.findIndex(gif => gif.id === action.payload.id);

        if (gifIndex === -1) {
            _gifs = [..._gifs, action.payload];
        } else {
            _gifs.splice(gifIndex, 1);
        }

        return _gifs;
    }

    return gifs;
}

const searchFilterReducer = (searchFilter = "", action) => {
    if (action.type === ApplicationStateActionsEnum.searchFilter) {
        return action.payload;
    }

    return searchFilter;
};

export default combineReducers({
    gifs: gifsReducer,
    savedGifs: toggleGifsReducer,
    searchFilter: searchFilterReducer,
});