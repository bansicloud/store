import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer () {
  return (
    <footer className="clearfix">
      <div className="container">
        <p>© 2018 More Just Store</p>
        <ul>
          <li><Link to="/" className="animated_link">Home</Link></li>
          <li><Link to="/docs" className="animated_link">Docs</Link></li>
          <li><a href="https://github.com/morejust/store" target="blank" className="animated_link">GitHub</a></li>
          <li><a href="#" target="blank" className="animated_link">Product Hunt</a></li>
        </ul>
      </div>
    </footer>
  );
}