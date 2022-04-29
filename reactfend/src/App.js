import React,{useState,useEffect} from 'react';
import StudentHome from './StudentHome';
import LandingPage from './LandingPage';

import FPlacements from './FacultyComponents/FPlacements';
import FClubs from './FacultyComponents/FClubs';
import FCovid from './FacultyComponents/FCovid';

import DepCSIT from './FacultyComponents/DepCSIT';
import DepCE from './FacultyComponents/DepCE';
import DepECE from './FacultyComponents/DepECE';
import DepBT from './FacultyComponents/DepBT';
import DepMTEEEI from './FacultyComponents/DepMTEEEI';

import SPlacements from './StudentComponents/SPlacements';
import SClubs from './StudentComponents/SClubs';
import SCovid from './StudentComponents/SCovid';

import SDepCSIT from './StudentComponents/SDepCSIT';
import SDepCE from './StudentComponents/SDepCE';
import SDepECE from './StudentComponents/SDepECE';
import SDepBT from './StudentComponents/SDepBT';
import SDepMTEEEI from './StudentComponents/SDepMTEEEI';
import FacultyRole from './FacultyRole';


import {Routes,Route,Navigate} from 'react-router-dom';
import 'animate.css';




const App=()=> {

  const [isAuthenticated,setAuthenticated]=useState(false);
  const [type,setType]=useState();

  
    
    
  
  const setAuth= boolean=>{
    setAuthenticated(boolean);
  } 

  async function isAuth(){
    try{
      const response=await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
      })

      const parseRes= await response.json();
      parseRes===true ? setAuthenticated(true):setAuthenticated(false);
    }catch(err){
      console.error(err.message);
    }
  }
  

   async function getTypeOfUser(){
    try{
        const response=await fetch("http://localhost:5000/type",{
            method:"GET",
            headers:{token:localStorage.token}
        })

        const parseRes=await response.json()
        
        setType(parseRes.type);

    }catch(err){
        console.error(err.message)
    }
 }

  //validate jwt token on refreshing
  useEffect(()=>{
    isAuth();
    getTypeOfUser();
  },[getTypeOfUser])

  return(
    <>
      <Routes>
        <Route path="/" element={!isAuthenticated ? (<LandingPage setAuth={setAuth} />):( type ? (type==1 ? (<StudentHome setAuth={setAuth} /> ):(<FClubs />)):(<FacultyRole setAuth={setAuth}  /> ))} />
        
        <Route path="/home" element={ isAuthenticated  ? (<StudentHome setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        
        <Route path="/facultyrole" element={ isAuthenticated  ? (<FacultyRole setAuth={setAuth} />):(<Navigate to="/" /> )} />

        <Route  path="/fplacements" element={<FPlacements setAuth={setAuth}/>}/>
        <Route  path="/fclubs" element={isAuthenticated  ? (<FClubs setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        <Route  path="/fcovid" element={isAuthenticated  ? (<FCovid setAuth={setAuth}/>):(<Navigate to="/" /> )} />

        <Route  path="/fdepartments" element={isAuthenticated  ? (<DepCSIT setAuth={setAuth}/>):(<Navigate to="/" /> )}/>
        <Route  path="/depce" element={isAuthenticated  ? (<DepCE setAuth={setAuth}/>):(<Navigate to="/" /> )}/>
        <Route  path="/depbt" element={isAuthenticated  ? (<DepBT setAuth={setAuth}/>):(<Navigate to="/" /> )}/>
        <Route  path="/depece" element={isAuthenticated  ? (<DepECE setAuth={setAuth}/>):(<Navigate to="/" /> )}/>
        <Route  path="/depmteeei" element={isAuthenticated  ? (<DepMTEEEI setAuth={setAuth}/>):(<Navigate to="/" /> )}/>

        <Route  path="/placement" element={isAuthenticated  ? (<SPlacements setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        <Route  path="/club" element={isAuthenticated  ? (<SClubs setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        <Route  path="/covid" element={isAuthenticated  ? (<SCovid setAuth={setAuth}/>):(<Navigate to="/" /> )} />

         <Route  path="/department" element={isAuthenticated  ? (<SDepCSIT setAuth={setAuth}/>):(<Navigate to="/" /> )} />
         <Route  path="/cedepartment" element={isAuthenticated  ? (<SDepCE setAuth={setAuth}/>):(<Navigate to="/" /> )} />
         <Route  path="/btdepartment" element={isAuthenticated  ? (<SDepBT setAuth={setAuth}/>):(<Navigate to="/" /> )} />
         <Route  path="/ecedepartment" element={isAuthenticated  ? (<SDepECE setAuth={setAuth}/>):(<Navigate to="/" /> )} />
         <Route  path="/mtdepartment" element={isAuthenticated  ? (<SDepMTEEEI setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>	
  )
}
export default App;