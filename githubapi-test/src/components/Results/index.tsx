import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserGists } from '../../state/actions';
import IAppState, { IGitHubUser, IGitHubUserGist, IUserGistResponse } from '../../types/redux/IAppState';
import Gist from '../Gist';

interface IUserResults {};

const Results: FC<IUserResults> = () => {
    const selectedUser = useSelector<IAppState, IGitHubUser>((state) => state.selectedUser);
    const gists = useSelector<IAppState, IUserGistResponse>((state) => state.gists);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedUser !== null) {
            dispatch(fetchUserGists(selectedUser.gists_url));
        }
    }, [selectedUser, dispatch]);
    
    return (
        <div className="user-gists-results-container">
            {gists.items.map((gist: IGitHubUserGist, index: number) => {
                return <Gist key={index} gist={gist} />;
            })}
        </div>
    );
};

export default Results;