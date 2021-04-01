import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setSelectedUser } from '../../state/actions';
import IAppState, { IUserResponse } from '../../types/redux/IAppState';

import './Search.css'; 

const Search = () => {
    const users = useSelector<IAppState, IUserResponse>(state => state.users)
    const dispatch = useDispatch();
    const [userFilter, setUserFilter] = useState('');
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [dirty, setDirty] = useState(false);

    let timeout = useRef<NodeJS.Timeout | null>(null);

    const shouldDropdownShow = useMemo(
        () => showUserDropdown && userFilter.length > 0 && !users.loadingUsers,
        [userFilter, users, showUserDropdown]
    );

    const userInputChange = useCallback((event) => {
        if (timeout.current !== null) {
            clearTimeout(timeout.current);
        }

        setShowUserDropdown(false);
        setDirty(true);
        setUserFilter(event.target.value);

        timeout.current = setTimeout(() => {
            dispatch(fetchUsers(event.target.value));
        }, 500);
    }, [dispatch, timeout]);

    const userSelected = useCallback((user?: any) => (event: any) => {
        let _selectedUser = user;

        if (event.key === 'Enter') {
            _selectedUser = users?.items?.find((_user) => _user.login === userFilter);
        }

        if (_selectedUser) {
            setUserFilter((username) => username !== _selectedUser.login ? _selectedUser.login : username);
            setShowUserDropdown(false);
            dispatch(setSelectedUser(_selectedUser));
            event.target.blur(); 
        }
    }, [userFilter, users, dispatch]);

    useEffect(() => {
        if (users.items.length > 0) {
            setShowUserDropdown(true);
            return;
        }

        setShowUserDropdown(false);
    }, [users]);

    return (
        <div className="user-search bg-light p-4 rounded">
            <div className="form-group position-relative mb-0">
                <label htmlFor="user-search">Github Users:</label>
                <input list="githubUsers" autoComplete="off" className="form-control" name="user" id="user-search" value={userFilter} onChange={userInputChange} onKeyPress={userSelected()} />

                <ul className={`user-selection-list list-unstyled dropdown-menu ${shouldDropdownShow ? 'show' : ''}`} role="navigation">
                    {users?.items?.map((user, index) => <li key={index} id={'item-' + user.login} className="list-item dropdown-item cursor-pointer" onClick={userSelected(user)}>{user.login}</li>)} 
                </ul>

                {dirty && !users.loadingUsers && users.items.length === 0 && <div className="pt-2"> 
                    <p className="mb-0"><small>No results for this filter.</small></p> 
                </div>}
            </div>
        </div>
    );
}

export default Search;