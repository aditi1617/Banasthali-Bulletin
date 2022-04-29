import React from 'react';
import {NavLink} from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

const NavbarS=()=>{

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
                   <NavLink className="nav-link" to="/home" >Home</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/placement">Placements</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/covid">Covid Control</NavLink>
                 </li>
                 <li className="nav-item">
                   <NavLink className="nav-link" to="/club">Clubs</NavLink>
                 </li>
                 <li class="nav-item dropdown">
                         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                           Departments
                         </a>
                         <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                           <NavLink className="dropdown-item" to="/department">CS/IT</NavLink>
                           <NavLink className="dropdown-item" to="/cedepartment">CE</NavLink>
                           <NavLink className="dropdown-item" to="/ecedepartment">ECE</NavLink>
                           <NavLink className="dropdown-item" to="/btdepartment">BT</NavLink>
                           <NavLink className="dropdown-item" to="/mtdepartment">MT/EE/EI</NavLink>
                           
                         </div>
                       </li>
               </ul>
             </div>
           </div>
         </nav>
       </>
)
}
       

export default NavbarS;