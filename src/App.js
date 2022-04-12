import React,{useState,useEffect} from 'react';
import FacultyHome from './FacultyHome';
import StudentHome from './StudentHome';
import LandingPage from './LandingPage';

import FPlacements from './FacultyComponents/FPlacements';
import FDepartments from './FacultyComponents/FDepartments';
import FClubs from './FacultyComponents/FClubs';
import FCovid from './FacultyComponents/FCovid';

import SPlacements from './StudentComponents/SPlacements';
import SDepartments from './StudentComponents/SDepartments';
import SClubs from './StudentComponents/SClubs';
import SCovid from './StudentComponents/SCovid';


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
        <Route path="/" element={!isAuthenticated ? (<LandingPage setAuth={setAuth} />):( type ? (<StudentHome setAuth={setAuth} /> ):(<FacultyHome setAuth={setAuth} /> ))} />
        <Route path="/facultyhome" element={ isAuthenticated   ? (<FacultyHome setAuth={setAuth} />):(<Navigate to="/" /> )} />
        <Route path="/studenthome" element={ isAuthenticated  ? (<StudentHome setAuth={setAuth}/>):(<Navigate to="/" /> )} />
        
        <Route  path="/fplacements" element={<FPlacements/>}/>
        <Route  path="/fdepartments" element={<FDepartments/>}/>
        <Route  path="/fclubs" element={ <FClubs/>} />
        <Route  path="/fcovid" element={ <FCovid/>} />

        <Route  path="/splacements" element={ <SPlacements /> } />
        <Route  path="/sdepartments" element={<SDepartments /> } />
        <Route  path="/sclubs" element={ <SClubs/> } />
        <Route  path="/scovid" element={<SCovid/> } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>	
  )
}
export default App;