import React from 'react';

import copyText from './misc/CopyText';

function RecentLinks(props) {

  const linkClicked = (link) => {
    console.log('Copying', link);
    copyText(link);
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
      return props.links.map(link => {
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
    
        return (
          <div className="card" key={link} onClick={() => linkClicked(link)}>
            <p>{displayName}</p>
            <div className="placeholder">
              {image}
            </div>
          </div>
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

  console.log('Rerender Recent links');
  return(
    <div className="row justify-content-md-center">
      <center>
        {renderLinks()}
        {/* {linksItems} */}
      </center>
    </div>
  )
}

export default RecentLinks;
