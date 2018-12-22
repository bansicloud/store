import React from 'react';

import logo from '../img/logo.png';

export default function Header() {
  return(
    <header>
      <div className="container-fluid">
          <div className="row">
                  <div className="col-3">
                      <a href="index.html"><img src={logo} alt="" width="49" height="35" /></a>
                  </div>
                  <div className="col-9">
                      Hey

                  </div>
              </div>
      </div>
	  </header>
  );
}