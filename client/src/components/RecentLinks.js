import React from 'react';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import uuidv1 from  'uuid/v1';

import copyText from './misc/CopyText';

function RecentLinks(props) {

  const linkClicked = (link) => {
    console.log('Copying', link);
    copyText(link);
  }

  const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const imageForExtension = (ext) => {
    const icons = {
      'doc': 'https://image.flaticon.com/icons/svg/888/888883.svg',
      'docx': 'https://image.flaticon.com/icons/svg/888/888883.svg',
      'xls': 'https://image.flaticon.com/icons/svg/888/888850.svg',
    };

    // Case for default img
    if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) {
      return null;
    }

    if (icons[ext]) {
      return icons[ext];
    }

    // Default case
    return 'https://image.flaticon.com/icons/svg/149/149346.svg';
  }

  const renderLinks = () => {
    if (props.links) {
      return props.links.map((link, index) => {
        const ext = link.split('.').pop();
        const icon = imageForExtension(ext);
        const fileNameWithExt = link.split('/').pop();
    
        // Shortening name
        let fileName, displayName;
        if (fileNameWithExt.length > 15) {
          fileName = fileNameWithExt.split('.')[0];
          displayName = fileName.substring(0, 10) + '... .' + ext;
        } else {
          displayName = fileNameWithExt;
        }
    
        let className, src;
        if (icon) {
          className = 'icon-preview';
          src = icon;
        } else {
          className = 'img-preview';
          src = link;
        }
    
        let image = <img className={className} src={src} alt="" />

        // Spring
        // let 

        console.log('Rerender Recent links');

        if (props.added > index) {
          console.log('awilebfqijwbfiqbfw');
        }
        return (
          <Motion
            defaultStyle={{ x: props.added > index ? 0 : 1 }}
            style={{ x: spring(1) }}
            key={uuidv1()}
          >
            {style => (
              <div className="card" style={{ opacity: `${style.x}` }} >
              <p>{displayName}</p>
              <div className="placeholder" onClick={() => linkClicked(link)}>
                {image}
              </div>
              <div className="card-btns">
                <div onClick={() => linkClicked(link)} className="btn_1 card-btn">Copy link</div>
                <div onClick={() => {openInNewTab(link)}} className="btn_1 card-btn">Proceed</div>
              </div>
            </div>
            )}
          </Motion>
        );
      });
    } else {
      return (
        <div className="card">
          <p>Upload your first file!</p>
          <div className="placeholder">
            <img className="icon-preview" src="https://image.flaticon.com/icons/svg/1055/1055646.svg" alt=""/>
          </div>
        </div>
      )
    }
  }

  return(
    <div className="row justify-content-md-center">
      <center>
        {renderLinks()}
        {props.allLinksBtn ? <Link to="/links" className="btn_1">View all links</Link> : ''}
      </center>
    </div>
  )
}

export default RecentLinks;
