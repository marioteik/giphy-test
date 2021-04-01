import React from 'react';
import './App.css';
import Search from './components/Search';
import Results from './components/Results';

import { Provider } from 'react-redux';
import store from './state';

function App() {
  return (
    <Provider store={store}>
      <div className="app container">
        <div className="mb-3 mt-3">
          <Search />
        </div>
        <div className="mb-3">
          <Results />
        </div>
      </div>
    </Provider>
  );
}

export default App;
