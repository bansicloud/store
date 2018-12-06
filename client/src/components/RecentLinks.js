import React from 'react';

function RecentLinks(props) {

  const linksItems = props.links.map(link => {
    return (
      <div key="link" className="card" style={{width: "14rem"}}>
        <img className="card-img-top" src={link} alt=""/>
        <div className="card-body">
          <a href="#" style={{width: "100%"}} className="btn_1 rounded">Copy link</a>
        </div>
      </div>
    );
  });

  
  return(
    <div>
      {linksItems}
    </div>
  )
}

export default RecentLinks;