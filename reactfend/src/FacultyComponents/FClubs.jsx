import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
import Ticker1 from '../Ticker1';
import Events from '../Events';
import Posts from '../Posts';
import NewPost from '../NewPost';
import clubs from '../allimages/clubs.jpg';

const FClubs =({setAuth})=>{
     
  
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
       <Header setAuth={setAuth} name={name} />
       <Banner img={clubs}/>
       <Ticker1 speed={10}/>
       <div className="events-posts">
         <Events category="clubs" refreshto="fclubs"/>
         <Posts category="clubs" refreshto="fclubs"/>
         
       </div>
       <NewPost category="clubs" refreshto="fclubs"/>
       <Footer/>
     </>
    )
}

export default FClubs;