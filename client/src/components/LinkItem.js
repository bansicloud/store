import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import copyText from './misc/CopyText';

export default class LinkItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayCopyText: false,
    }

    this.timeout = null;
  }
  
  openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  linkClicked(link) {
    copyText(link);

    this.setState({displayCopyText: true});

    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => this.setState({displayCopyText: false}), 1000);
  }

  render() {
    if (!this.props.noLinks) {
      return (
        <Motion
          defaultStyle={{ x: this.props.defaultOpacity }}
          style={{ x: spring(1) }}
        >
          {style => (
            <div className="card" style={{ opacity: `${style.x}` }} >
            <p>{this.props.text}</p>
            <div className="placeholder" onClick={() => this.linkClicked(this.props.link)}>
              <img className={this.props.className || 'icon-preview'} src={this.props.imageSrc} alt="" />
            </div>
            <div className="card-btns">
              <div onClick={() => this.linkClicked(this.props.link)} className="btn_1 card-btn">
                <i className="fas fa-copy"></i>{this.state.displayCopyText ? ' Copied' : ''}
              </div>
              <div onClick={() => this.openInNewTab(this.props.link)} className="btn_1 card-btn">
                <i className="fas fa-file-download"></i>
              </div>
            </div>
          </div>
          )}
        </Motion>
      );
    } else {
      return(
        <div className="card">
          <p>Upload some files!</p>
          <div className="placeholder">
            <img className="icon-preview" src="https://image.flaticon.com/icons/svg/1055/1055646.svg" alt=""/>
          </div>
        </div>
      );
    }
  }
}