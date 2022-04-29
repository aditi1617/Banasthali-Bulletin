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

const DepBT =({setAuth})=>{

     
  
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
       <DBanner img={banner} text="Biotechnology Engineering" />
       <Ticker1 speed={10}/>
       <div className="events-posts">
         <Events category="btdepartments" refreshto="fdepartments"/>
         <Posts category="btdepartments" refreshto="fdepartments"/>
         
       </div>
       <NewPost category="btdepartments" refreshto="fdepartments"/>
       <Footer/>
     </>
    )
}

export default DepBT;