import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/logo.svg';

export default function Header() {
  return(
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 header-left-col">
            <Link to={process.env.PUBLIC_URL + '/'}>
              <img src={logo} alt="" width="49" height="35" />
              <h1 className="title">More Just Store</h1>
            </Link>
          </div>
          <div className="col-2">
            <div id="social">
              <ul>
                <li>
                  <a href="https://github.com/morejust/store" target="blank">
                    <i className="fab fa-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
	  </header>
  );
}