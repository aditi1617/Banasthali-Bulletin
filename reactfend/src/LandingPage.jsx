import React from 'react';
import Header1 from './Header1';
import LFooter from './LFooter';
import 'animate.css';
import {Carousel} from 'react-bootstrap';
import lp1 from './allimages/lp1.jpg';
import lp2 from './allimages/lp2.jpg';
import lp3 from './allimages/lp3.jpg';
import lp4 from './allimages/lp4.jpg';
import lp5 from './allimages/lp5.jpg';


const LandingPage =({setAuth})=>{
  const setAuth1=boolean=> {
      setAuth(boolean);
  } 
  return(
     <>
     
      <Header1 setAuth={setAuth1}  />
      <div className="welcome-banner text-center">
        <div className="welcome-text animate__animated animate__fadeIn animate__delay-1s animate__slower">
          Welcome to <strong>Banasthali Bulletin </strong>
         <h1>Banasthali's digital Notice Board </h1>
          <h3>(For Btech Students and Staff)</h3>
        </div>
      </div>

      <Carousel className="carousel-login">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={lp1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
          <h4>hello 123 chekc</h4>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={lp2}
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
            src={lp3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={lp4}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
      <LFooter />


     </>
  )
}

export default LandingPage;