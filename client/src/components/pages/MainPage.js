import React, { Component } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LeftBlock from '../MainPage/LeftBlock';
import RightBlock from '../MainPage/RightBlock';

// Local Settings of your app
const LOCAL_API_ROOT = 'http://localhost:4000';
const MAIN_PROD_API_ROOT = 'https://morejust.herokuapp.com';

const selectAPI = origin => {
  if (origin.includes('localhost')) {
    return LOCAL_API_ROOT;
  } else if (origin === 'https://morejust.store') {
    return MAIN_PROD_API_ROOT;
  } else {
    return origin;
  }
}

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: {}
    };
  }

  componentWillMount() {
    const apiRoot = selectAPI(window.location.origin);

    this.setState({
      settings: {
	...this.state.settings,
        API_ROOT: apiRoot,
      }
    })

    this.fetchInitialInfo(apiRoot);
  }

  // Initial loading of app settings
  fetchInitialInfo(apiRoot) {
    fetch(`${apiRoot}/initialInfo`, {
      method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
      this.setState({
        settings: { ...this.state.settings, ...data }
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
