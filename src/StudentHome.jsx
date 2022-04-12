import React,{useState,useEffect} from 'react';
import Header from './Header';
import NavbarS from './NavbarS';
import Carousel1 from './Carousel1';
import Footer from './Footer';

const StudentHome =({setAuth})=>{

    const setAuth1=boolean=> {
      setAuth(boolean);
  } 
    //create a state for displaying the name.

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
       <NavbarS home="/studenthome" p="/splacements" d="/sdepartments" c="/sclubs" co="/scovid"/>
       <Carousel1 />
       <Footer />
      </div>
     </>
	)
}

export default StudentHome;