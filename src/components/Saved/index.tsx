import React, {FC, useMemo} from 'react';
import {useSelector} from 'react-redux';
import IAppState, {IGif} from '../../state/types/IAppState';
import Gif from '../Gif';

import './Saved.css';

interface IUserResults {
};

const Saved: FC<IUserResults> = () => {
    const savedGifs = useSelector<IAppState, IGif[]>((state) => state.savedGifs);

    return useMemo(() => (
        <main>
            {(!savedGifs || savedGifs.length === 0) && (
                <div className="d-flex justify-content-center mt-5">
                    <div className="flex-column">
                        <h4 className="text-center">
                            No gifs yet!
                        </h4>
                        <p className="text-center">
                            <small>Your saved gifs will be shown here.</small>
                        </p>
                    </div>
                </div>
            )}

            <div className="user-gifs-results-container card-columns">
                {savedGifs?.map((gif: IGif, index: number) => {
                    return <Gif key={index} gif={gif} remove={true}/>;
                })}
            </div>
        </main>
    ), [savedGifs])
};

export default Saved;