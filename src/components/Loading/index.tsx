import ReactLoading from "react-loading";
import React, {FC} from "react";

interface ILoadingProps {}

const Loading: FC<ILoadingProps> = () => {
    return (
        <div className="d-flex justify-content-center flex-column p-4 w-100">
            <ReactLoading className="align-self-center" type="bars" color="#fff"/>

            <p className="align-self-center">Loading</p>
        </div>
    )
}

export default Loading;