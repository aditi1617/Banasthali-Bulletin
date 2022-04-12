import React from 'react';
import logo from './allimages/college_logo.jpg';
import {NavLink} from 'react-router-dom';
import './index.scss';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Header =({setAuth,name})=> {

    const logout=e=>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
	return(
	<>	
       <header className="Header">
        <img className="Logo" src={logo} height="80" alt="logo" />
        <div className="name">
          Hello {name}
        </div>
        <NavLink className="btn btn-primary btn-logout" to="/landing" role="button" onClick={e=>logout(e)}>
         Logout</NavLink>
       </header>
    </>   
		)
}

export default Header;