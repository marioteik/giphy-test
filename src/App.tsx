import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import {Provider} from 'react-redux';
import store from './state';

import './App.css';

import Home from './pages/Home';
import MyGifs from "./pages/MyGifs";

function App() {
    return (
        <Provider store={store}>
            <div className="bg-dark text-white">
                <div className="container app">
                    <Router>
                        <Switch>
                            <Route path="/my-saved-gifs">
                                <MyGifs/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </Provider>
    );
}

export default App;
