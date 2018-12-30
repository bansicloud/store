import React from 'react';
import { Link } from 'react-router-dom';

export default function HeaderUser () {
  return(
    <header className="header-user">
      <div className="container-fluid">
        <div className="row">
          <div className="col-8 header-left-col">
            <p>Welcome back, user</p>
          </div>
          <div className="col-4">
            <div id="social">
              <Link to={process.env.PUBLIC_URL + "/"}>
                <p style={{marginRight: '5px'}}>Account</p><i className="fas fa-user"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
	  </header>
  );
}