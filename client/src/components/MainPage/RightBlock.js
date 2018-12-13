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

  componentWillMount() {
    const localLinks = JSON.parse(localStorage.getItem('links'));
    this.setState({
      links: localLinks
    });
  }

  addLinks(links) {
    let allLinks;
    if (this.state.links) {
      allLinks = this.state.links.concat(links);
    } else {
      allLinks = links;
    }
    
    this.setState({
      links: allLinks
    });
    this.saveToLocal(allLinks);
  }

  saveToLocal(links) {
    const str = JSON.stringify(links);
    localStorage.setItem('links', str);
  }

  render() {
    console.log('Rerendering right block');
    return (
      <div className="col-lg-6 content-right">
        <FileForm addLinks={this.addLinks.bind(this)} />
        <RecentLinks links={this.state.links} />
			</div>
    );
  }
}

export default RightBlock;