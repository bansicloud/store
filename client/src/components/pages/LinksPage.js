import React from 'react';
import { Link } from 'react-router-dom';

import RecentLinks from '../RecentLinks';

import getLinksFromLocal from '../misc/getLinksFromLocal';

export default function DocsPage() {
  const links = getLinksFromLocal().reverse();
  return(
    <div>
      <h1>All links</h1>
      <Link to="/">Go to main page</Link>
      <RecentLinks links={links} />
    </div>
  );
}