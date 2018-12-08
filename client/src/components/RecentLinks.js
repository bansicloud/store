import React from 'react';

import copyText from './CopyText';

function RecentLinks(props) {

  const linkClicked = (link) => {
    console.log('Copying', link);
    copyText(link);
  }

  const imageForExtension = (ext) => {
    const img = ['jpg', 'png', 'jpeg', 'svg', 'bmp', 'gif', 'ico'];
    const zip = ['7z', 'rar', 'gz', 'z', 'zip'];
    // const disk = ['bin', 'dmg', 'iso', 'toast', 'vcd'];
    // const data = ['csv', 'dat', 'db', 'dbf', 'log', 'mdb', 'sql', 'tar', 'xml'];

    if (img.includes(ext)) {
      return null;
    }
    if (zip.includes(ext)) {
      return 'file-archive';
    }

    // Default case
    return 'file';
  }

  const linksItems = props.links.map(link => {
    const ext = link.split('.').pop();
    const icon = imageForExtension(ext);

    let display;
    if (icon) {
      const className = `fas fa-${icon}`;
      display = <i className={className}></i>;
    } else {
      // display = <img className="card-img-top img-thumbnail" src={link} alt=""/>
      display = <img src={link} alt=""/>
    }

    return (
      <div className="col-6 col-sm-4" key={link}>
        <div class="thumbnail">
          {display}
       </div>
       <button onClick={() => linkClicked(link)} className="btn_1 rounded">Copy link</button>
      </div>
    );
  });

  console.log('Rerender Recent links');
  return(
    <div className="row justify-content-md-center">
      {linksItems}
    </div>
  )
}

export default RecentLinks;
