import React from 'react';
import { Link } from 'react-router-dom';

import RecentLinks from '../RecentLinks';

import getLinksFromLocal from '../misc/getLinksFromLocal';

export default function DocsPage() {
  const links = getLinksFromLocal().reverse();
  
  return(
    <div>
      <div className="col-lg-12">
        <h1>All links</h1>
        <Link to="/">Go to main page</Link>
      </div>
      <div className="col-lg-12">
        <RecentLinks links={links} />
      </div>
    </div>
  );
}