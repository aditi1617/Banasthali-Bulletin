import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bimg from './allimages/bannerimg.jpg';

const Banner=({img,text})=>{
	return(
      <>
       <div className="banner-container">
         <img src={img} className="img-fluid banner-img" alt="Responsive image"/>
         <div className="banner-text text-center">{text}</div>
       </div>
      </>
		)
}

export default Banner;