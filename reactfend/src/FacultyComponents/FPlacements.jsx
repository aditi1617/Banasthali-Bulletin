import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Banner from '../Banner';
import placement from '../allimages/placement.jpg'
import Ticker1 from '../Ticker1';
import Events from '../Events';
import Posts from '../Posts';
import NewPost from '../NewPost';

const FPlacements =({setAuth})=>{
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

  /*async function isAuth(){
    try{
      const response=await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
      })

      const parseRes= await response.json();
      parseRes===true ? setAuth1(true):setAuth1(false);
    }catch(err){
      console.error(err.message);
    }
  }*/

  useEffect(()=>{
     setAuth(true)
     getName()
  },[])      //bracket to make only single request

    return(
     <>
       <Header setAuth={setAuth} name={name} />
       <Banner img={placement} text="Placement Bulletin" />
       <Ticker1 speed={10}/>
       <div className="events-posts">
         <Events category="placements" refreshto="/fplacements"/>
         <Posts category="placements" refreshto="/fplacements"/>
         
       </div>
       <NewPost category="placements" refreshto="/fplacements"/>
       <Footer/>
     </>
    )
}

export default FPlacements;