import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bimg from './allimages/bannerimg.jpg';

const DBanner=({img,text})=>{
	return(
      <>
       <div className="banner-container">
         <img src={img} className="img-fluid dep-banner-img" alt="Responsive image"/>
         <div className="dep-banner-text text-center">{text}</div>
       </div>
      </>
		)
}

export default DBanner;