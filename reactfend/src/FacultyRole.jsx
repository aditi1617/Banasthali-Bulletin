import React,{useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';


const FacultyRole=({setAuth})=>{

 const logout=e=>{
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }
    


	return(
		<>
         <div className="select-role">
         <h1 className="select-role-heading">Select Role</h1>
         <div className=" btn-role-container">
           <NavLink className="btn btn-primary btn-role" type="button" to="/fplacements">
             Placement Cell</NavLink>
           <NavLink className="btn btn-primary btn-role" type="button" to="/fdepartments" >
             Departments</NavLink>
           <NavLink className="btn btn-primary btn-role" type="button" to="/fcovid" >
             Covid Control Room</NavLink>
           
           
           <NavLink className="btn btn-primary btn-role" type="button" to="/home">
             View Mode Only</NavLink>
           <button className="btn btn-primary btn-role" type="button" onClick={e=>logout(e)}>
             Logout</button>
           
         </div>


         </div>


		</>

		)
}

export default FacultyRole;