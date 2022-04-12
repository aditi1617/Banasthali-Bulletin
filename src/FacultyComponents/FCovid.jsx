import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Banner from '../Banner';
import Ticker1 from '../Ticker1';
import Events from '../Events';
import Posts from '../Posts';
import NewPost from '../NewPost';

const FCovid =({setAuth})=>{
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
       <Header setAuth={setAuth1} name={name} />
       <Navbar />
       <Banner />
       <Ticker1 speed={10}/>
       <div className="events-posts">
         <Events category="covid" refreshto="fcovid"/>
         <Posts category="covid" refreshto="fcovid"/>
         
       </div>
       <NewPost category="covid" refreshto="fcovid"/>
       <Footer/>
     </>
    )
}

export default FCovid;