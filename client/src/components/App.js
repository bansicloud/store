import React from 'react';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import MainPage from './pages/MainPage';
import DocsPage from './pages/DocsPage';
import LinksPage from './pages/LinksPage';

const App = () => {
  const history = createHistory({
    basename: process.env.PUBLIC_URL,
  });

  return (
    <Router history={history} basename={process.env.PUBLIC_URL}>
      <div>
        <Route path={process.env.PUBLIC_URL + "/"} exact component={MainPage} />
        <Route path={process.env.PUBLIC_URL + "/docs"} component={DocsPage} />
        <Route path={process.env.PUBLIC_URL + "/links"} component={LinksPage} />
      </div>
    </Router>
  )
}

export default App;