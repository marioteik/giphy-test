import React, { FC, useMemo, useEffect, useState } from 'react';
import { fetchFromUrl } from '../../api/github';
import IFork from '../../types/IFork';
import { IGitHubUserGist } from '../../types/redux/IAppState';

import './Forks.css';

interface IForks {
    gist: IGitHubUserGist;
};

const Forks: FC<IForks> = ({ gist }) => {
    const [forks, setForks] = useState<IFork[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const _forks = await fetchFromUrl<IFork[]>(gist.forks_url);

                setForks(_forks);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [gist.forks_url]);

    return useMemo(() => (
        <div className="forks-container d-inline-flex justify-content-between align-items-center">
            <p className="mb-0">{forks.length} {forks.length === 1 ? 'fork' : 'forks'}{forks.length > 0 && ':'}</p>
            {forks.length > 0 && <ul className="forks list-inline mb-0 ml-3">
                {[...forks].splice(-3).map((fork, index) => (
                    <li key={index} className="fork list-inline-item">
                        <a href={fork.html_url} target="_blank" className="avatar avatar-sm rounded-circle" rel="noreferrer">
                            <img src={fork.owner.avatar_url} alt={fork.owner.login} title={fork.owner.login} />
                        </a>
                    </li>
                ))}
            </ul>}
        </div>
    ), [forks]);
};

export default Forks;