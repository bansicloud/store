import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import RecentLinks from '../RecentLinks';

import getLinksFromLocal from '../misc/getLinksFromLocal';

export default function DocsPage() {
  const links = getLinksFromLocal().reverse();
  
  return(
    <div>
      <Header />
      <main role="main" className="container">
        <h3 className="mt-3 mb-4">Your files:</h3>
        <RecentLinks links={links} />
      </main>
      <Footer />
    </div>
  );
}