import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import DocsPage from './pages/DocsPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={MainPage} />
        <Route path="/docs" component={DocsPage} />
      </div>
    </BrowserRouter>
  )
}

export default App;