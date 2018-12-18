import React from 'react';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';
import uuidv1 from  'uuid/v1';

import copyText from './misc/CopyText';
import imageForExtension from './misc/ImageForExtension';

function RecentLinks(props) {

  const linkClicked = (link) => {
    copyText(link);
  }

  const openInNewTab = (url) => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  const renderLinks = () => {
    if (props.links) {
      return props.links.map((link, index) => {
        const ext = link.split('.').pop();
        const icon = imageForExtension(ext);
        const fileNameWithExt = link.split('/').pop();
    
        // Shortening filename
        let fileName, displayName;
        if (fileNameWithExt.length > 15) {
          fileName = fileNameWithExt.split('.')[0];
          displayName = fileName.substring(0, 10) + '... .' + ext;
        } else {
          displayName = fileNameWithExt;
        }
        
        // Identifying to display an icon or an image in preview
        let className, src;
        if (icon) {
          className = 'icon-preview';
          src = icon;
        } else {
          className = 'img-preview';
          src = link;
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
                <img className={className} src={src} alt="" />
              </div>
              <div className="card-btns">
                <div onClick={() => linkClicked(link)} className="btn_1 card-btn"><i className="fas fa-copy"></i></div>
                <div onClick={() => {openInNewTab(link)}} className="btn_1 card-btn"><i className="fas fa-file-download"></i></div>
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
        <br/>
        {props.allLinksBtn ? <Link to="/links" className="btn_1">View all links</Link> : ''}
      </center>
    </div>
  )
}

export default RecentLinks;
