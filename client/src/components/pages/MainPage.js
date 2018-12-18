import React, { Component } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LeftBlock from '../MainPage/LeftBlock';
import RightBlock from '../MainPage/RightBlock';

class MainPage extends Component {
  render() {
    return (
      <div className="container-fluid full-height">
        <div className="row row-height">
          <LeftBlock />
          <RightBlock />
          <ToastContainer
            transition={Zoom}
            hideProgressBar
            newestOnTop
            draggable={false}
            pauseOnHover={false}
          />
        </div>
      </div>
    );
  }
}

export default MainPage;