import React, {FC, useCallback, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IGif} from '../../state/types/IAppState';
import {faBookmark, faTrash} from "@fortawesome/free-solid-svg-icons";
import "./Gif.css";

import {useDispatch} from "react-redux";
import {toggleBookmark} from "../../state/actions";

interface IGifProps {
    gif: IGif;
    remove?: boolean;
};

const Gif: FC<IGifProps> = ({gif, remove}) => {
    const dispatch = useDispatch();

    const doBookmark = useCallback((gif) => () => {
        dispatch(toggleBookmark(gif));
    }, [dispatch]);

    return useMemo(() => (
        <section className="card mb-3 text-white border-dark overflow-hidden bg-white gif-container">
            <div
                className={`position-absolute bookmark-icon text-warning ${gif.bookmarked ? 'bookmarked' : ''} ${remove ? 'remove-icon' : ''}`}
                onClick={doBookmark(gif)}>
                <FontAwesomeIcon icon={remove ? faTrash : faBookmark}/>
            </div>

            <img className="card-img" src={gif.images.fixed_width.url} alt=""/>
            <div className="card-img-overlay d-flex align-items-end pb-2">
                <div className="d-flex flex-column">
                    <h6 className="card-title mb-0 text-warning"><small><strong>{gif.username}</strong></small></h6>
                    <p className="card-text"><small>{gif.title}</small></p>
                </div>
            </div>
        </section>
    ), [gif, doBookmark, remove]);
};

export default Gif;