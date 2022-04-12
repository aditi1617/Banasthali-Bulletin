import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import bimg from './allimages/bannerimg.jpg';

const Banner=()=>{
	return(
      <>
       <div className="banner-container">
         <img src={bimg} className="img-fluid banner-img" alt="Responsive image"/>
       </div>
      </>
		)
}

export default Banner;