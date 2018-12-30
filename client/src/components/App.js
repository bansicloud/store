import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import DocsPage from './pages/DocsPage';
import LinksPage from './pages/LinksPage';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Route path={process.env.PUBLIC_URL + "/"} exact component={MainPage} />
        <Route path={process.env.PUBLIC_URL + "/docs"} component={DocsPage} />
        <Route path={process.env.PUBLIC_URL + "/links"} component={LinksPage} />
      </div>
    </BrowserRouter>
  )
}

export default App;