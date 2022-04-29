import React from 'react';
import Ticker from 'react-ticker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Ticker1=()=>{
	return(
      <>
      <div className="container ticker-container">
        <Ticker>
              {(props) => (
                <div className="container ticker-text">
                  Highest package for batch 2022 : 26 lpa at Flipkart;
                 60 %of students placed with packages above 10 lpa.&emsp;
                
                </div>      
              )}
        </Ticker>
      </div>
      </>
		)
}

export default Ticker1;
