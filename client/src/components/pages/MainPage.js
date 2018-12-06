import React, { Component } from 'react';

import LeftBlock from '../MainPage/LeftBlock';
import RightBlock from '../MainPage/RightBlock';

class MainPage extends Component {
  render() {
    return (
      <div className="container-fluid full-height">
        <div className="row row-height">
          <LeftBlock />
          <RightBlock />
        </div>
      </div>
    );
  }
}

export default MainPage;