import Search from "../../components/Search";
import Results from "../../components/Results";
import React  from "react";

const Home = () => {
    return (
        <div className="row">
            <div className="mb-3 pt-3 col-12">
                <Search/>
            </div>
            <div className="mb-3 col-12">
                <Results/>
            </div>
        </div>
    );
};

export default Home;