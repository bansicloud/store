import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';

export default function DocsPage() {
  return(
    <div>
      <Header />
      <h1>Docs page</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}