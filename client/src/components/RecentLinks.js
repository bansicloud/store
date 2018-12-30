import React from 'react';
import { Link } from 'react-router-dom';
import uuidv1 from  'uuid/v1';

import LinkItem from './LinkItem';

import imageForExtension from './misc/ImageForExtension';

function RecentLinks(props) {

  const renderLinks = () => {
    if (props.links.length > 0) {
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
          <LinkItem 
            key={uuidv1()}
            link={link}
            text={displayName}
            imageSrc={src}
            className={className}
            defaultOpacity={ props.added > index ? 0 : 1 } // Used for animation
          />
          
        );
      });
    } else {
      return (
        <LinkItem noLinks />
      )
    }
  }

  return(
    <div className="row justify-content-md-center mb-4">
      <center>
        {renderLinks()}
        <br/>
        {props.allLinksBtn ? <Link to={process.env.PUBLIC_URL + "/links"} className="btn_1">View all links</Link> : ''}
      </center>
    </div>
  )
}

export default RecentLinks;