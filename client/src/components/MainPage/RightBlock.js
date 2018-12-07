import React, { Component } from 'react';

import FileForm from '../FileForm';
import RecentLinks from '../RecentLinks';

class RightBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: []
    }
  }

  addLinks(links) {
    this.setState({
      links: this.state.links.concat(links)
    });
  }

  render() {
    console.log(this.state.links);
    return (
      <div className="col-lg-6 content-right">
        <FileForm addLinks={this.addLinks.bind(this)} />
        <RecentLinks links={this.state.links} />
			</div>
    );
  }
}

export default RightBlock;