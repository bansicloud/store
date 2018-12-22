import React, { Component } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LeftBlock from '../MainPage/LeftBlock';
import RightBlock from '../MainPage/RightBlock';

// Local Settings of your app
const DEV_API_ROOT = 'http://localhost:4000';
// const PROD_API_ROOT = 'https://morejust.herokuapp.com';
const PROD_API_ROOT = 'https://morejust.store';

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {}
    };
  }

  componentWillMount() {
    this.API_ROOT = window.location.hostname === 'morejust.store'
      ? PROD_API_ROOT
      : DEV_API_ROOT;
      // : `//${window.location.host}`;

    this.setState({
      settings: {
        ...this.state.settings,
        API_ROOT: this.API_ROOT
      }
    })

    this.fetchInitialInfo();
  }

  // Initial loading of app settings
  fetchInitialInfo() {
    fetch(`${this.API_ROOT}/initialInfo`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        settings: {...this.state.settings, ...data}
      });
      console.log('SetUp initial settings', this.state.settings);
    })
  }

  render() {
    return (
      <div className="container-fluid full-height">
        <div className="row row-height">
          <LeftBlock />
          <RightBlock settings={this.state.settings}/>
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