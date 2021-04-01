import React, { FC, useMemo } from 'react';
import { IGitHubUserGist } from '../../types/redux/IAppState';
import Forks from '../Forks';
import "./Gist.css";

interface IGist {
    gist: IGitHubUserGist;
};

const Gist: FC<IGist> = ({ gist }) => {
    const files = useMemo(() => Object.values(gist.files), [gist]);
    const badges = useMemo(() => files.map((file) => file.language), [files]);

    return useMemo(() => (
        <div className="card mb-3">
            <div className="card-header  bg-white">
                <h6 className="mb-0">
                    <a href={gist.html_url} target="_blank" rel="noreferrer">
                        {gist.description || 'No description'}
                    </a>
                </h6>
            </div>

            <div className="card-body">
                Files:

                <ul className="filenames mb-0">
                    {files.map((file, index) => (
                        <a href={file.raw_url} key={index}  target="_blank" rel="noreferrer">
                            <li className="file">
                                {file.filename}
                            </li>
                        </a>
                    ))}
                </ul>
            </div>

            <div className="card-footer bg-white d-inline-flex justify-content-between align-items-center">
                <ul className="badges list-inline mb-0">
                    {badges.map((language, index) => (
                        <li key={index} className="list-inline-item">
                            <span className="badge bg-primary">{language}</span>
                        </li>
                    ))}
                </ul>

                <Forks gist={gist} />
            </div>
        </div>
    ), [gist, files, badges]);
};

export default Gist;