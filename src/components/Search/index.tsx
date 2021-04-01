import React, {useCallback, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {fetchGifs, setSearchFilter} from '../../state/actions';

import './Search.css';

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchField, setSearchField] = useState('');

    const handleSearchFieldChange = useCallback((event: any) => {
        setSearchField(event.target.value);
    }, [setSearchField]);

    const searchGifs = useCallback((event: any) => {
        if (!event.key || event.key === 'Enter') {
            dispatch(fetchGifs(searchField));
            dispatch(setSearchFilter(searchField));
        }
    }, [dispatch, searchField]);

    return (
        <header className="row">
            <div className="col-8 col-lg-10">
                <div className="input-group">
                        <input autoComplete="off" className="form-control" name="giphyValue" id="giphy-value"
                               placeholder="Search all GIFs"
                               value={searchField} onChange={handleSearchFieldChange} onKeyPress={searchGifs}/>
                    <div className="input-group-append">
                        <button className="btn btn-block btn-warning" onClick={searchGifs}>
                            Search for GIF
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-4 col-lg-2">
                <button className="btn btn-block btn-link pr-0 pl-0 text-right text-warning"
                        onClick={() => history.push('/my-saved-gifs')}>
                    My Saved Gifs
                </button>
            </div>
        </header>
    );
}

export default Search;