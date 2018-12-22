import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

export default function DocsPage() {
  return(
    <div>
      <Header />
      <main role="main" className="container">
        <h2 className="mt-5">* Todo docs page</h2>
        <p className="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code>padding-top: 60px;</code> on the <code>body &gt; .container</code>.</p>
        <p>Back to <Link to="/">the main page</Link> to use service online.</p>
      </main>
      <Footer />
    </div>
  );
}