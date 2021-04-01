import React from "react";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Saved from "../../components/Saved";

const MyGifs = () => {
    const history = useHistory();

    return (<div>
        <div className="d-flex justify-content-center pt-2 pb-2 position-relative">
            <div onClick={() => history.goBack()} className="position-absolute pt-3 go-back cursor-pointer">
                <FontAwesomeIcon icon={faArrowLeft}/> Go Back
            </div>
            <h2>My Saved GIFS</h2>
        </div>
        <Saved/>
    </div>);
};

export default MyGifs;