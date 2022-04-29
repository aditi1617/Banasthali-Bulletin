import React from 'react';
import {Carousel} from 'react-bootstrap';
import bv2 from './allimages/bv2.jpeg';
import bv3 from './allimages/bv3.jpeg';
import bv4 from './allimages/bv4.jpeg';
import bv5 from './allimages/bv5.jpg';
import bv6 from './allimages/bv6.jpg';

const Carousel1=()=>{
	return(
      <>
      <div className="carousel-container">
       <Carousel>
         <Carousel.Item className="carousel-item">
           <img
             className="d-block w-100"
             src={bv2}
             alt="Second slide"
           />
          <Carousel.Caption>
             <h3>Second slide label</h3>
             
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={bv3}
             alt="Second slide"
           />
          <Carousel.Caption>
             <h3>Second slide label</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={bv4}
             alt="Second slide"
           />
          <Carousel.Caption>
             <h3>Second slide label</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={bv5}
             alt="Second slide"
           />
          <Carousel.Caption>
             <h3>Second slide label</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
           <img
             className="d-block w-100"
             src={bv6}
             alt="Second slide"
           />
          <Carousel.Caption>
             <h3>Second slide label</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           </Carousel.Caption>
         </Carousel.Item>
       </Carousel>
      </div>
      </>
		)
}

export default Carousel1;