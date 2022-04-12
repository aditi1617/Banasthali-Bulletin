import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

const Navbar=({home,p,c,co,d,setAuth})=>{

	return(
       <>
         <nav className="navbar navbar-expand-lg navbar-dark py-0">
           <div className="container-fluid justify-content-center">
      
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarNav">
               <ul className="navbar-nav">
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/facultyhome" >Home</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/fplacements">Placements</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/fcovid">Covid Control</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/fdepartments">Departments</NavLink>
                 </li><li className="nav-item">
                   <NavLink className="nav-link" to="/fclubs">Clubs</NavLink>
                 </li>
               </ul>
             </div>
           </div>
         </nav>
       </>
)
}
       

export default Navbar;