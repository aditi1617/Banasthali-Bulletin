import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';
import DBanner from '../DBanner';
import banner from '../allimages/depbanner.jpg';
import Ticker1 from '../Ticker1';
import Events from '../Events';
import Posts from '../Posts';
import NewPost from '../NewPost';

const DepMTEEEI =({setAuth})=>{

     
  
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
       <Header setAuth={setAuth} name={name}/>
       <Navbar />
       <DBanner img={banner} text="Mechatronics/Electronics and Electrical/Electronics and Instrumentation"/>
       <Ticker1 speed={10}/>
       <div className="events-posts">
         <Events category="mtdepartments" refreshto="fdepartments"/>
         <Posts category="mtdepartments" refreshto="fdepartments"/>
         
       </div>
       <NewPost category="mtdepartments" refreshto="fdepartments"/>
       <Footer/>
     </>
    )
}

export default DepMTEEEI;