import React from 'react';
import {NavLink} from 'react-router-dom';



const LFooter=()=>{
	return(
       <>
       <footer>
        <div className="footer-div1">
          <h2>Get all updates<br/>right here at<br/></h2>
          <h1><strong>Banasthali Bulletin</strong></h1>
        </div>
        <div className="footer-div2">
          <ul className="footer-list">
             <li ><NavLink className="footer-element" to="/">Home</NavLink></li>
             <li ><NavLink className="footer-element" to="/placements">Placements</NavLink></li>
             <li ><NavLink className="footer-element" to="/covid">Covid Control</NavLink></li>
             <li ><NavLink className="footer-element" to="/departments">Departments</NavLink></li>
             <li ><NavLink className="footer-element" to="clubs">Clubs</NavLink></li>
          </ul>
        </div>
       </footer>
       </>
		)
}

export default LFooter;