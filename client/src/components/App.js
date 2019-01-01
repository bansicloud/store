import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import MainPage from './pages/MainPage';
import DocsPage from './pages/DocsPage';
import LinksPage from './pages/LinksPage';

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL} history={createHistory({ basename: process.env.PUBLIC_URL })}>
      <div>
        <Route path={process.env.PUBLIC_URL + "/"} exact component={MainPage} />
        <Route path={process.env.PUBLIC_URL + "/docs"} exact component={DocsPage} />
        <Route path={process.env.PUBLIC_URL + "/links"} exact component={LinksPage} />
      </div>
    </HashRouter>
  )
}

export default App;