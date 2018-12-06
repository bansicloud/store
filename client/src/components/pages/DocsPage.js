import React from 'react';
import { Link } from 'react-router-dom';

export default function DocsPage() {
  return(
    <div>
      <h1>Docs page</h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}