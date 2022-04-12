import React,{useState,useEffect}from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Carousel1 from './Carousel1';
import Footer from './Footer';
import FDepartments from './FacultyComponents/FDepartments';

const FacultyHome =({setAuth})=>{

    const setAuth1=boolean=> {
      setAuth(boolean);
  } 
 
 const [name,setName]=useState("")

 async function getName(){
    try{
        const response=await fetch("http://localhost:5000/home",{
            method:"GET",
            headers:{token:localStorage.token}
        })

        const parseRes=await response.json()
        setName(parseRes.name);

    }catch(err){
        console.error(err.message)
    }
 }

 useEffect(()=>{
    getName()
 },[])      //bracket to make only single request

	return(
     <>




      <div className="home-container">
       <Header setAuth={setAuth1} name={name}/>
       <Navbar setAuth={setAuth1} home="/facultyhome" p="/fplacements" d="/fdepartments" c="/fclubs" co="/fcovid"/>
       <Carousel1 />
       <Footer />
      </div>
     </>
	)
}

export default FacultyHome;