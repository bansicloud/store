import React, { Component } from 'react';

import FileForm from '../FileForm';
import RecentLinks from '../RecentLinks';

import getLinksFromLocal from '../misc/getLinksFromLocal';

class RightBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      links: [],
      recentLinks: [],
      lastAddedAmount: 0
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // If we changing only lastAddedAmount - dont rerender
    if (this.state.lastAddedAmount !== nextState.lastAddedAmount) {
      return false;
    }
    return true;
  }

  componentWillMount() {
    this.localLinksToState();
  }

  saveToLocal(links) {
    console.log("SaveToLocal:", links);
    const str = JSON.stringify(links);
    localStorage.setItem('links', str);
  }

  // Saving to state all local links
  localLinksToState() {
    const links = getLinksFromLocal().reverse();
    const recentLinks = links.slice(0,6);
    this.setState({
      links,
      recentLinks
    });
  }

  addLinks(links) {
    console.log('Adding links, amount:', links.length);
    this.setState({lastAddedAmount: links.length});

    // Get links from local store
    const localLinks = getLinksFromLocal();

    // Add to them received links
    const updatedLinks = localLinks.concat(links);

    // Save to local store
    this.saveToLocal(updatedLinks);

    // Update state with new data 
    this.localLinksToState();

    this.setState({lastAddedAmount: 0});
  }

  render() {
    console.log('Rerendering right block', this.state.recentLinks.length);
    return (
      <div className="col-lg-6 content-right">
        <FileForm addLinks={this.addLinks.bind(this)} />
        <RecentLinks links={this.state.recentLinks} allLinksBtn={this.state.links > this.state.recentLinks} added={this.state.lastAddedAmount} />
			</div>
    );
  }
}

export default RightBlock;