import React, { Component } from 'react';

import FileForm from '../FileForm';
import RecentLinks from '../RecentLinks';
import BlockStats from '../BlockStats';

import HeaderUser from '../HeaderUser';

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
    const str = JSON.stringify(links);
    localStorage.setItem('links', str);
  }

  // Updating state with all local links
  localLinksToState() {
    const links = getLinksFromLocal().reverse();
    const recentLinks = links.slice(0,3);
    this.setState({
      links,
      recentLinks
    });
  }

  addLinks(links) {
    // console.log('Adding links, amount:', links.length);
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
    // console.log('Rerendering right block', this.state.recentLinks.length);
    const {FILES_LIMIT, MAX_FILE_SIZE_MB, API_ROOT} = this.props.settings;

    return (
      <div className="col-lg-6 content-right">
        {this.state.recentLinks.length ? <HeaderUser /> : ''}
        <FileForm
          addLinks={this.addLinks.bind(this)} 
          FILES_LIMIT={FILES_LIMIT}
          MAX_FILE_SIZE_MB={MAX_FILE_SIZE_MB}
          API_ROOT={API_ROOT}
        />
        <RecentLinks 
          links={this.state.recentLinks}
          allLinksBtn={this.state.links > this.state.recentLinks} 
          added={this.state.lastAddedAmount} 
        />
        <BlockStats API_ROOT={API_ROOT}/>
			</div>
    );
  }
}

export default RightBlock;